import os
from config import Config

class ProductionConfig(Config):
    """Production-specific configuration"""
    
    # Production database (PostgreSQL recommended)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://user:password@localhost/simandu_prod'
    
    # Production server settings
    SERVER_NAME = 'simandutrade.online'
    PREFERRED_URL_SCHEME = 'https'
    
    # Security settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-very-secure-production-key')
    WTF_CSRF_ENABLED = True
    
    # Email settings for production
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'info@simandutrade.online')
    
    # Rate limiting for production
    RATELIMIT_DEFAULT = "1000 per day;100 per hour"
    
    # CORS settings for production
    CORS_ORIGINS = ['https://simandutrade.online', 'https://www.simandutrade.online']
