from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from config import Config
from validators import validate_lead_data
import logging
import email_service
from datetime import datetime
import smtplib
# from flask_mail import Mail, Message

# Initialize app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db = SQLAlchemy(app)
# mail = Mail(app)
migrate = Migrate(app, db)
CORS(app)  # Enable CORS for all routes
limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri="memory://",
    default_limits=[app.config['RATELIMIT_DEFAULT']]
)

class Lead(db.Model):
    """Database model for storing lead information"""
    __tablename__ = 'leads'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=False)
    interest = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)
    language = db.Column(db.String(10), default='en')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    status = db.Column(db.String(20), default='new')  # new, contacted, converted
    
    def __repr__(self):
        return f'<Lead {self.email}>'

# Create database tables
with app.app_context():
    db.create_all()

# Configure logging
logging.basicConfig(level=logging.INFO)
app.logger.addHandler(logging.StreamHandler())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index.html')
def index1():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/products.html')
def products():
    return render_template('products.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/contact.html', methods=['POST'])
# This line creates a web address (URL) that your website can use
# '/api/submit-lead' is the web address where data will be sent
# methods=['POST'] means this address only accepts data being sent TO it (not requests to get data)
@limiter.limit("10 per minute")  # This prevents spam - only 10 submissions allowed per minute
def submit_lead():
    """Endpoint for lead submissions"""
    # This is the function that runs when someone sends data to '/api/submit-lead'
    
    try:
        # Try block - if anything goes wrong, we'll handle it gracefully
        
        # Get and validate data
        # request.get_json() gets the data that was sent from the website form
        # This data comes from JavaScript in your frontend (script.js)
        data = request.get_json()
        
        # validate_lead_data() checks if the data is correct (email format, required fields, etc.)
        if errors := validate_lead_data(data):
            # If there are errors, send them back to the website
            return jsonify({'success': False, 'errors': errors}), 400
        
        # Get client language from request headers
        # When the website sends data, it also tells us what language the user prefers
        language = request.headers.get('Accept-Language', 'en')[:2]
        # If the language isn't supported, default to English
        if language not in ['en', 'ru', 'fr']:
            language = 'ru'
        # Create lead record
        # This creates a new entry in the database with the user's information
        new_lead = Lead(
            name=data['name'],        # User's name from the form
            email=data['email'],      # User's email from the form
            phone=data['phone'],      # User's phone from the form
            interest=data['interest'], # What product they're interested in
            message=data['message'],  # Their message/question
            language=language         # Their preferred language
        )
        
        # Save to database
        # db.session.add() prepares the data to be saved
        db.session.add(new_lead)
        # db.session.commit() actually saves it to the database
        db.session.commit()
        
        # Send emails (in production, use Celery task queue)
        # These functions send confirmation emails to the user and notifications to you
        email_service.send_confirmation_email(new_lead)
        email_service.send_admin_notification(new_lead)
        
        # Send success message back to the website
        return jsonify({
            'success': True,
            'message': 'Thnk you for your inquiry! We will contact you soon.'
        })
    
    except Exception as e:
        # If ANY error happens (database error, email error, etc.)
        db.session.rollback()  # Undo any database changes
        app.logger.error(f"Lead submission error: {str(e)}")  # Log the error
        # Send error message back to the website
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500

@app.route('/health')
def health_check():
    """Endpoint for health checks"""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # app.run(ssl_context='adhoc')  # Remove in production
    app.run(debug=True)  # Remove in production