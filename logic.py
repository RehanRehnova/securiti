import os
import json
from datetime import datetime
import re
from flask_mail import Message
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from dotenv import load_dotenv
load_dotenv()
# === Config pulled from env ===
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = os.getenv('SPREADSHEET_ID')
SHEET_NAME = os.getenv('SHEET_NAME')
SERVICE_ACCOUNT_INFO = os.getenv('GOOGLE_SERVICE_ACCOUNT_JSON')

def get_sheets_service():
    if SERVICE_ACCOUNT_INFO:
        info = json.loads(SERVICE_ACCOUNT_INFO)
        print("Using env var for:", info.get('client_email'))
        creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    else:
        print("Using credentials.json")
        creds = service_account.Credentials.from_service_account_file('credentials.json', scopes=SCOPES)
    return build('sheets', 'v4', credentials=creds)

def validate_contact_data(data):
    if not data:
        return False, 'No data received'

    is_inquiry_form = 'userType' in data

    if is_inquiry_form:
        required = ['userType', 'firstName', 'lastName', 'email', 'service', 'details']
        missing = [field for field in required if not data.get(field)]
        if missing:
            return False, f'Missing fields: {", ".join(missing)}'

        if data['userType'] in ['business', 'startup', 'agency'] and not data.get('companyName'):
            return False, 'Company name required for business inquiries'
    else:
        required = ['contactReason', 'firstName', 'lastName', 'email', 'message']
        missing = [field for field in required if not data.get(field)]
        if missing:
            return False, f'Missing fields: {", ".join(missing)}'

        if data['contactReason'] == 'partnership' and not data.get('companyName'):
            return False, 'Company name required for partnerships'
        if data['contactReason'] == 'career' and not data.get('position'):
            return False, 'Position required for career inquiries'

    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', data['email'], re.IGNORECASE):
        return False, 'Invalid email address'

    return True, None

def build_contact_email(data, admin_email):
    is_inquiry_form = 'userType' in data

    if is_inquiry_form:
        reason = data.get('userType', '').replace('_', ' ').title()
        html_body = f"""
        <h2>New {reason} Inquiry</h2>
        <p><strong>Name:</strong> {data.get('firstName')} {data.get('lastName')}</p>
        <p><strong>Email:</strong> {data.get('email')}</p>
        <p><strong>whatsapp:</strong> {data.get('whatsapp')}</p>
        <p><strong>User Type:</strong> {data.get('userType')}</p>
        """
        if data.get('companyName'):
            html_body += f"<p><strong>Company:</strong> {data['companyName']}</p>"
        if data.get('website'):
            html_body += f"<p><strong>Website:</strong> {data['website']}</p>"
        if data.get('service'):
            html_body += f"<p><strong>Service:</strong> {data['service']}</p>"
        if data.get('budget'):
            html_body += f"<p><strong>Budget:</strong> {data['budget']}</p>"
        html_body += f"""
        <hr>
        <p><strong>Details:</strong></p>
        <p>{(data.get('details') or '').replace('\n', '<br>')}</p>
        <p><strong>Source:</strong> Get started page</p>
        """
        subject = f"New {reason} Inquiry: {data.get('firstName')} {data.get('lastName')}"
    else:
        reason = data.get('contactReason', '').replace('_', ' ').title()
        html_body = f"""
        <h2>New {reason} Submission</h2>
        <p><strong>Name:</strong> {data.get('firstName')} {data.get('lastName')}</p>
        <p><strong>Email:</strong> {data.get('email')}</p>
        """
        if data.get('companyName'):
            html_body += f"<p><strong>Company:</strong> {data['companyName']}</p>"
        if data.get('position'):
            html_body += f"<p><strong>Position:</strong> {data['position']}</p>"
        html_body += f"""
        <hr>
        <p><strong>Message:</strong></p>
        <p>{(data.get('message') or '').replace('\n', '<br>')}</p>
        """
        subject = f"New {reason}: {data.get('firstName')} {data.get('lastName')}"

    return Message(
        subject=subject,
        recipients=[admin_email],
        html=html_body,
        reply_to=data.get('email')
    )

def append_to_sheet(data):
    try:
        service = get_sheets_service()
        is_inquiry_form = 'userType' in data
        sheet_name = 'Inquiries' if is_inquiry_form else 'Contacts'

        if is_inquiry_form:
            HEADERS = [
                'Timestamp', 'User Type', 'First Name', 'Last Name', 'Email',
                'Company Name', 'Website', 'Service', 'Budget', 'Details', 'Source'
            ]
            row = [
                data.get('timestamp', datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
                data.get('userType', ''),
                data.get('firstName', ''),
                data.get('lastName', ''),
                data.get('email', ''),
                data.get('companyName', ''),
                data.get('website', ''),
                data.get('service', ''),
                data.get('budget', ''),
                data.get('details', ''),
                data.get('source', 'website')
            ]
            range_end = 'K'
        else:
            HEADERS = [
                'Timestamp', 'Contact Reason', 'First Name', 'Last Name', 'Email',
                'Company Name', 'Position', 'Message'
            ]
            row = [
                datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                data.get('contactReason', ''),
                data.get('firstName', ''),
                data.get('lastName', ''),
                data.get('email', ''),
                data.get('companyName', ''),
                data.get('position', ''),
                data.get('message', '')
            ]
            range_end = 'H'

        try:
            result = service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{sheet_name}!A1:{range_end}1'
            ).execute()
            existing_headers = result.get('values', [])
        except HttpError:
            existing_headers = []

        if not existing_headers or existing_headers[0]!= HEADERS:
            print(f"Creating headers in '{sheet_name}' sheet...")
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{sheet_name}!A1',
                valueInputOption='RAW',
                body={'values': [HEADERS]}
            ).execute()

        body = {'values': [row]}
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=f'{sheet_name}!A:{range_end}',
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body=body
        ).execute()

        updated = result.get('updates', {}).get('updatedRows', 0)
        print(f"Sheet '{sheet_name}' updated: {updated} row added")
        return True

    except HttpError as e:
        print(f"Sheets API error: {e}")
        return False
    except Exception as e:
        print(f"Unexpected error in append_to_sheet: {e}")
        return False


def _ensure_sheet_exists(service, sheet_title):
    """Create a worksheet tab if it does not already exist."""
    try:
        meta = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        titles = [s['properties']['title'] for s in meta.get('sheets', [])]
        if sheet_title in titles:
            return True
        service.spreadsheets().batchUpdate(
            spreadsheetId=SPREADSHEET_ID,
            body={
                'requests': [{
                    'addSheet': {
                        'properties': {'title': sheet_title}
                    }
                }]
            }
        ).execute()
        print(f"Created sheet tab: {sheet_title}")
        return True
    except HttpError as e:
        print(f"Failed to ensure sheet '{sheet_title}': {e}")
        return False
    except Exception as e:
        print(f"Unexpected error ensuring sheet '{sheet_title}': {e}")
        return False


def validate_newsletter_data(data):
    if not data:
        return False, 'No data received'
    email = (data.get('email') or '').strip()
    if not email:
        return False, 'Email is required'
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email, re.IGNORECASE):
        return False, 'Invalid email address'
    return True, None


def append_newsletter_to_sheet(email, source='footer'):
    """Append a newsletter subscription to the 'newsletters' sheet tab."""
    try:
        service = get_sheets_service()
        sheet_name = 'newsletters'
        HEADERS = ['Timestamp', 'Email', 'Source']
        email = (email or '').strip().lower()
        source = (source or 'footer').strip() or 'footer'

        if not _ensure_sheet_exists(service, sheet_name):
            return False

        # Optional light dedupe: skip if email already present
        try:
            existing = service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{sheet_name}!B:B'
            ).execute()
            emails = [
                (row[0] or '').strip().lower()
                for row in existing.get('values', [])[1:]
                if row
            ]
            if email in emails:
                print(f"Newsletter: email already subscribed ({email})")
                return True
        except HttpError as e:
            print(f"Newsletter dedupe read skipped: {e}")

        try:
            result = service.spreadsheets().values().get(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{sheet_name}!A1:C1'
            ).execute()
            existing_headers = result.get('values', [])
        except HttpError:
            existing_headers = []

        if not existing_headers or existing_headers[0] != HEADERS:
            print(f"Creating headers in '{sheet_name}' sheet...")
            service.spreadsheets().values().update(
                spreadsheetId=SPREADSHEET_ID,
                range=f'{sheet_name}!A1',
                valueInputOption='RAW',
                body={'values': [HEADERS]}
            ).execute()

        row = [
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            email,
            source
        ]
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range=f'{sheet_name}!A:C',
            valueInputOption='RAW',
            insertDataOption='INSERT_ROWS',
            body={'values': [row]}
        ).execute()

        updated = result.get('updates', {}).get('updatedRows', 0)
        print(f"Sheet '{sheet_name}' updated: {updated} row added")
        return True

    except HttpError as e:
        print(f"Sheets API error (newsletter): {e}")
        return False
    except Exception as e:
        print(f"Unexpected error in append_newsletter_to_sheet: {e}")
        return False
