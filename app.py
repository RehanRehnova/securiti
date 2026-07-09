from flask import Flask, render_template, request, jsonify, abort 
from dotenv import load_dotenv
load_dotenv()

from flask_cors import CORS
from flask_mail import Mail
from datetime import datetime
import os
import re
from logic import append_to_sheet, build_contact_email, validate_contact_data, get_sheets_service
from data.articles import get_all_articles, get_article_by_slug, get_categories, get_related_articles


app = Flask(__name__)
CORS(app)

# === Mail Config ===
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = (os.getenv('MAIL_SENDER_NAME', 'Webpage Lead'), os.getenv('MAIL_USERNAME'))
RECIPIENT_EMAIL = os.getenv('RECIPIENT_EMAIL')

mail = Mail(app)

# === GSheets Config ===

SPREADSHEET_ID = os.getenv('SPREADSHEET_ID')

# === Routes ===
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-started')
def get_started():
    return render_template('get-started.html')

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json()
        print("RECEIVED DATA:", data)
        
        is_valid, error = validate_contact_data(data)
        if not is_valid:
            return jsonify({'success': False, 'error': error}), 400
        

        # Send Email
        msg = build_contact_email(data, RECIPIENT_EMAIL)
        mail.send(msg)

        # Append to Sheet - don't block if it fails
        try:
            sheet_success = append_to_sheet(data)
            if not sheet_success:
                print("Warning: Failed to write to Google Sheet")
        except Exception as sheet_error:
            print(f"Sheets error: {sheet_error}")

        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"Error in /api/contact: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Server error. Please try again or email us directly.'
        }), 500

@app.route('/thank-you')
def thank_you():
    return render_template('thank-you.html')

@app.route('/get-in-touch')
def get_in_touch():
    return render_template('get-in-touch.html')

@app.route('/about-us')
def about_us():
    return render_template('index.html')

@app.route('/about-test')
def about_test():
    return render_template('about-us.html')
    
    
@app.route('/blog')
def blog_index():
    articles = get_all_articles()  # Now reads .md files
    categories = get_categories()  # Now reads from .md frontmatter
    return render_template('blog_index.html', articles=articles, categories=categories)

@app.route('/blog/<slug>')
def blog_article(slug):
    article = get_article_by_slug(slug)  # Now reads .md file
    if not article:
        abort(404)
    related_articles = get_related_articles(slug)
    return render_template('blog_template.html', article=article, related_articles=related_articles)
    
@app.route('/test-sheets')
def test_sheets():
    """Test Google Sheets connection"""
    try:
        if not SPREADSHEET_ID:
            return jsonify({
                'success': False,
                'error': 'SPREADSHEET_ID missing in.env'
            }), 500

        service = get_sheets_service()
        sheet_metadata = service.spreadsheets().get(spreadsheetId=SPREADSHEET_ID).execute()
        sheet_title = sheet_metadata.get('properties', {}).get('title', 'Unknown')

        test_row = [
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'TEST', 'Connection', 'Successful', 'test@rehnova.com',
            '', '', 'This is a test row from /test-sheets'
        ]

        body = {'values': [test_row]}
        result = service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range='Inquiries!A:K',
            valueInputOption='RAW',
            body=body
        ).execute()

        updated = result.get('updates', {}).get('updatedCells', 0)

        return jsonify({
            'success': True,
            'message': 'Google Sheets connection works!',
            'sheet_title': sheet_title,
            'cells_updated': updated
        }), 200

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'error_type': type(e).__name__
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
