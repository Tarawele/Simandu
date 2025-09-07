import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()  # Load environment variables from .env file

class Config:
    # Database configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'fallback_weak_secret'

    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Email configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', '1', 'on']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'sitmad96@gmail.com')
    
    # Security
    CSRF_ENABLED = True
    
    # Admin emails (parse comma-separated list)
    admin_emails = os.environ.get('ADMIN_EMAILS', 'turaman99@gmail.com')
    ADMIN_EMAILS = [email.strip() for email in admin_emails.split(',')]
    
    # Rate limiting
    RATELIMIT_DEFAULT = "200 per day;50 per hour"