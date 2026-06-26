from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

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
        
        if not data:
            return jsonify({'success': False, 'error': 'No data received'}), 400
        
        required = ['userType', 'firstName', 'lastName', 'email', 'service', 'budget', 'details']
        missing = [field for field in required if not data.get(field)]
        
        if missing:
            return jsonify({
                'success': False, 
                'error': f'Missing fields: {", ".join(missing)}'
            }), 400

        # Log or save to DB here
        print(f"New inquiry from {data['firstName']} {data['lastName']}: {data['email']}")

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


@app.route('/submission-error')
def submission_error():
    return render_template('error.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
