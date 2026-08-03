
from flask import Flask, render_template, request, jsonify, abort, Response, send_from_directory, redirect

from dotenv import load_dotenv
load_dotenv()

from flask_cors import CORS
from flask_mail import Mail
from datetime import datetime
import os
import re
from logic import (
    append_to_sheet,
    append_newsletter_to_sheet,
    build_contact_email,
    validate_contact_data,
    validate_newsletter_data,
    validate_booking_data,
    build_booking_email,
    append_booking_to_sheet,
    get_sheets_service,
)
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
    return render_template('about-us.html')


@app.route('/careers')
def careers():
    return render_template('careers.html')


@app.route('/booking')
def booking():
    return render_template('booking.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/sitemap')
def sitemap():
    return render_template('sitemap.html')

@app.route('/sitemap.xml')
def sitemap_xml():
    xml_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rehnova.digital/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://rehnova.digital/booking</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://rehnova.digital/get-started</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://rehnova.digital/get-in-touch</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://rehnova.digital/about-us</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://rehnova.digital/careers</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://rehnova.digital/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>https://rehnova.digital/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://rehnova.digital/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>"""
    return Response(xml_content, mimetype='application/xml')


@app.route('/api/booking', methods=['POST'])
def handle_booking():
    try:
        data = request.get_json() or {}
        print("RECEIVED BOOKING DATA:", data)

        is_valid, error = validate_booking_data(data)
        if not is_valid:
            return jsonify({'success': False, 'error': error}), 400

        try:
            msg = build_booking_email(data, RECIPIENT_EMAIL)
            mail.send(msg)
        except Exception as mail_error:
            print(f"Warning: Mail send error in /api/booking: {mail_error}")

        try:
            sheet_success = append_booking_to_sheet(data)
            if not sheet_success:
                print("Warning: Failed to write booking to Google Sheet")
        except Exception as sheet_error:
            print(f"Sheets booking error: {sheet_error}")

        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"Error in /api/booking: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Server error handling your booking request. Please try again.'
        }), 500


@app.route('/api/newsletter', methods=['POST'])
def handle_newsletter():
    try:
        data = request.get_json() or {}
        is_valid, error = validate_newsletter_data(data)
        if not is_valid:
            return jsonify({'success': False, 'error': error}), 400

        email = data.get('email', '').strip()
        source = (data.get('source') or 'footer').strip() or 'footer'

        try:
            sheet_success = append_newsletter_to_sheet(email, source=source)
            if not sheet_success:
                print("Warning: Failed to write newsletter email to Google Sheet")
                return jsonify({
                    'success': False,
                    'error': 'Could not save subscription. Please try again later.'
                }), 500
        except Exception as sheet_error:
            print(f"Newsletter sheets error: {sheet_error}")
            return jsonify({
                'success': False,
                'error': 'Could not save subscription. Please try again later.'
            }), 500

        return jsonify({'success': True}), 200

    except Exception as e:
        print(f"Error in /api/newsletter: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Server error. Please try again later.'
        }), 500


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

# === File & PDF Download Routes ===
FILES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'files')

@app.route('/files/<path:filename>')
def serve_file(filename):
    """Serve or download files directly from the files directory securely."""
    file_path = os.path.join(FILES_DIR, filename)
    if not os.path.isfile(file_path):
        abort(404)
    mode = request.args.get('view', '').lower()
    as_attachment = False if mode in ['1', 'true', 'yes', 'inline'] else True
    response = send_from_directory(FILES_DIR, filename, as_attachment=as_attachment)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Accept-Ranges'] = 'bytes'
    return response

@app.route('/download/<path:filename>')
def download_file(filename):
    """Force-download route for files in the files directory."""
    file_path = os.path.join(FILES_DIR, filename)
    if not os.path.isfile(file_path):
        abort(404)
    response = send_from_directory(FILES_DIR, filename, as_attachment=True)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Accept-Ranges'] = 'bytes'
    return response

@app.route('/download-audit-helpbook')
@app.route('/audit-helpbook')
def download_audit_helpbook():
    """Direct route for downloading the Rehnova Digitals Audit Helpbook PDF."""
    pdf_name = 'rehnova-digitals-audit-helpbook.pdf'
    file_path = os.path.join(FILES_DIR, pdf_name)
    if not os.path.isfile(file_path):
        abort(404)
    response = send_from_directory(FILES_DIR, pdf_name, as_attachment=True)
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Accept-Ranges'] = 'bytes'
    return response

# === Industry Routes ===
INDUSTRIES_DATA = {
    'healthcare': {
        'slug': 'healthcare',
        'title': 'Healthcare & Life Sciences',
        'subtitle': 'HIPAA-compliant web applications, clinical data pipelines, and AI operational systems.',
        'badge': 'HIPAA Ready & Clinical Operations',
        'hero_desc': 'We engineer secure, audit-ready digital solutions for medical practices, biotech startups, and clinical research organizations. From telemetry data pipelines to patient-facing web platforms.',
        'capabilities': [
            {'title': 'HIPAA & Telemetry Data Pipelines', 'desc': 'Automated, encrypted ingestion of EHR and device data with complete audit logging and zero-trust controls.'},
            {'title': 'Patient & Provider Portals', 'desc': 'High-performance web apps built with Next.js/SSR for friction-free booking, records access, and telehealth.'},
            {'title': 'Clinical Operations Agents', 'desc': 'Autonomous AI agents for lab report classification, patient triage automation, and claim auditing.'}
        ],
        'compliance': ['HIPAA Security Rule', 'SOC2 Type II Controls', 'GDPR Health Data Compliance'],
        'stat': '99.99%',
        'stat_label': 'Uptime & Zero-Trust Audit Reliability'
    },
    'edtech': {
        'slug': 'edtech',
        'title': 'EdTech & Academic Operations',
        'subtitle': 'Unified LMS platforms, automated grading pipelines, and institutional management systems.',
        'badge': 'Institutional Software & LMS',
        'hero_desc': 'Empowering universities, online academies, and training providers with resilient digital infrastructure. Seamlessly scaling from classroom management to enterprise-wide student portals.',
        'capabilities': [
            {'title': 'Unified LMS & Student Dashboards', 'desc': 'Custom learning management systems featuring real-time course tracking, interactive assignments, and video streaming.'},
            {'title': 'Automated Grading & Attendance', 'desc': 'Custom background pipelines and AI evaluation engines that reduce administrative overhead for faculty.'},
            {'title': 'Institutional Analytics', 'desc': 'Comprehensive data warehouses providing institutional leadership with instant retention and performance metrics.'}
        ],
        'compliance': ['FERPA Compliant Data Handling', 'COPPA Standards', 'ISO 27001 Security'],
        'stat': '10x',
        'stat_label': 'Concurrent Student Load Capacity'
    },
    'professional-services': {
        'slug': 'professional-services',
        'title': 'Professional & B2B Services',
        'subtitle': 'Client portals, automated proposal engines, and unified CRM workflow systems.',
        'badge': 'B2B Workflows & Client Portals',
        'hero_desc': 'Accelerating growth for legal, accounting, consulting, and digital agency firms through intelligent web applications and integrated operational backbones.',
        'capabilities': [
            {'title': 'Custom Client Portals', 'desc': 'Secure, branded workspaces for document exchange, contract signing, project status, and automated billing.'},
            {'title': 'Proposal & Billing Automation', 'desc': 'Automated invoice generation, Stripe/Shopify API integrations, and instant contract dispatch.'},
            {'title': 'Unified CRM & Lead Pipelines', 'desc': 'End-to-end integration connecting lead capture forms directly to backend databases and internal Slack/Teams ops.'}
        ],
        'compliance': ['SOC2 Compliant Architecture', 'Encrypted Document Vaults', 'PCI-DSS Payment Pipelines'],
        'stat': '75%',
        'stat_label': 'Reduction in Administrative Latency'
    },
    'fintech': {
        'slug': 'fintech',
        'title': 'FinTech & Financial Operations',
        'subtitle': 'Audit-ready compliance dashboards, transaction intelligence, and payment orchestration.',
        'badge': 'Transaction Intelligence & Security',
        'hero_desc': 'Building bulletproof financial platforms and internal audit tools for modern financial teams, wealth managers, and payment processors.',
        'capabilities': [
            {'title': 'Payment Gateway & Ledger Engines', 'desc': 'High-throughput payment orchestration, automated reconciliation, and ledger tracking.'},
            {'title': 'Fraud & Anomaly Detection Agents', 'desc': 'Real-time AI monitoring agents identifying suspicious transactional behaviors before settlement.'},
            {'title': 'Compliance & Audit Reporting', 'desc': 'Automated generation of financial compliance reports, tax summaries, and institutional export feeds.'}
        ],
        'compliance': ['PCI-DSS Level 1 Standards', 'KYC / AML Regulatory Workflows', '256-bit AES Encryption'],
        'stat': '0.001s',
        'stat_label': 'Transaction Processing Latency'
    },
    'ecommerce': {
        'slug': 'ecommerce',
        'title': 'E-Commerce & Digital Commerce',
        'subtitle': 'High-concurrency store engines, automated inventory sync, and dynamic checkout systems.',
        'badge': 'High-Scale Commerce Infrastructure',
        'hero_desc': 'Engineering ultra-fast headless storefronts, custom backend inventory management, and multi-channel fulfillment pipelines for scaling e-commerce brands.',
        'capabilities': [
            {'title': 'Headless Storefront Web Apps', 'desc': 'Sub-second page load times with custom React/Next.js storefronts integrated with Shopify and Stripe.'},
            {'title': 'Omnichannel Inventory Sync', 'desc': 'Real-time inventory synchronization across multiple warehouses, storefronts, and marketplaces.'},
            {'title': 'AI Recommendation & Conversion Engines', 'desc': 'Personalized product discovery agents that boost average order value and checkout completion rates.'}
        ],
        'compliance': ['PCI-DSS Compliant Checkout', 'GDPR / CCPA Customer Data Rules', 'Global CDN Edge Caching'],
        'stat': '300ms',
        'stat_label': 'Average Page Load Time globally'
    }
}

@app.route('/industries')
@app.route('/industries/<slug>')
def industry_detail(slug=None):
    return redirect('/#segments')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run( debug=True ,host='0.0.0.0', port=5000)
