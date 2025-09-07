import re
from flask import current_app

def validate_lead_data(data):
    """Validate lead submission data"""
    errors = {}
    
    # Required fields check
    required_fields = ['name', 'email', 'phone', 'interest', 'message']
    for field in required_fields:
        if not data.get(field):
            errors[field] = 'This field is required'
    
    # Email validation
    if 'email' not in errors:
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not re.match(email_regex, data['email']):
            errors['email'] = 'Invalid email format'
    
    # Phone validation
    if 'phone' not in errors:
        phone_regex = r'^\+?[0-9]{8,15}$'
        if not re.match(phone_regex, data['phone']):
            errors['phone'] = 'Invalid phone number'
    
    # Product interest validation
    valid_interests = ['coffee', 'cacao', 'oil', 'nuts', 'wheat', 'soap', 'onion', 'other']
    if 'interest' not in errors and data['interest'] not in valid_interests:
        errors['interest'] = 'Invalid product selection'
    
    return errors if errors else None