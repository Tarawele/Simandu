import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app

def send_email(recipient, subject, body, is_html=False):
    """Send email using app configuration"""
    msg = MIMEMultipart()
    msg['From'] = current_app.config['MAIL_DEFAULT_SENDER']
    msg['To'] = recipient
    msg['Subject'] = subject

    if is_html:
        msg.attach(MIMEText(body, 'html'))
    else:
        msg.attach(MIMEText(body, 'plain'))

    try:
        # Debug logging
        current_app.logger.info(f"Email config - Server: {current_app.config['MAIL_SERVER']}, Port: {current_app.config['MAIL_PORT']}")
        current_app.logger.info(f"Email config - Username: {current_app.config['MAIL_USERNAME']}, Password set: {'Yes' if current_app.config['MAIL_PASSWORD'] else 'No'}")

        with smtplib.SMTP(
            current_app.config['MAIL_SERVER'],
            current_app.config['MAIL_PORT']
        ) as server:
            server.ehlo()  # Identify ourselves to the SMTP server
            server.starttls()  # Secure the connection
            server.ehlo()  # Re-identify ourselves as an encrypted connection
            server.login(
                current_app.config['MAIL_USERNAME'],
                current_app.config['MAIL_PASSWORD']
            )
            server.send_message(msg)
            current_app.logger.info(f"Email sent to {recipient}")
        return True
    except Exception as e:
        current_app.logger.error(f"Email failed to {recipient}: {str(e)}")
        return False

# def send_confirmation_email(lead):
#     """Send bilingual confirmation to client"""
#     template_name = f"confirmation_{lead.language}.html"
#     template_path = os.path.join(
#         current_app.root_path, 
#         'email_templates', 
#         template_name
#     )
    
#     # Fallback to English if template not found
#     if not os.path.exists(template_path):
#         template_path = os.path.join(
#             current_app.root_path,
#             'email_templates',
#             'confirmation_en.html'
#         )
    
#     with open(template_path, 'r', encoding='utf-8') as f:
#         html_content = f.read().replace('{name}', lead.name)
    
#     subject = "Thank You - Simandu Trade" if lead.language == 'en' else "Terima Kasih - Simandu Trade"
    
#     return send_email(
#         lead.email,
#         subject,
#         html_content,
#         is_html=True
#     )

def send_confirmation_email(lead):
    """Send multilingual confirmation to client"""
    template_name = f"confirmation_{lead.language}.html"
    template_path = os.path.join(
        current_app.root_path, 
        'email_templates', 
        template_name
    )
    
    # Fallback to English if template not found
    if not os.path.exists(template_path):
        template_path = os.path.join(
            current_app.root_path,
            'email_templates',
            'confirmation_en.html'
        )
    
    # Read template content
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Replace all placeholders with actual data
    replacements = {
        '{name}': lead.name,
        '{email}': lead.email,
        '{phone}': lead.phone or 'Not provided',
        '{interest}': lead.interest,
        '{message}': lead.message or 'No message provided'
    }
    
    for placeholder, value in replacements.items():
        html_content = html_content.replace(placeholder, value)
    
    # Set subject based on language
    subject_map = {
        'en': "Thank You - Simandu Trade",
        'fr': "Merci - Simandu Trade",
        'ru': "Спасибо - Simandu Trade"
    }
    subject = subject_map.get(lead.language, subject_map['en'])
    
    return send_email(
        lead.email,
        subject,
        html_content,
        is_html=True
    )

# def send_admin_notification(lead):
#     """Send notification to admin team"""
#     subject = f"New Lead: {lead.name} - {lead.interest}"
#     text_content = f"""
#     New Lead Submission:
#     --------------------
#     Name: {lead.name}
#     Email: {lead.email}
#     Phone: {lead.phone}
#     Product Interest: {lead.interest}
#     Message: {lead.message}
#     Language: {lead.language}
#     Received: {lead.created_at}
#     """
    
#     results = []
#     for recipient in current_app.config['ADMIN_EMAILS']:
#         results.append(send_email(recipient, subject, text_content))
    
#     return all(results)

def send_admin_notification(lead):
    """Send notification to admin team with language info"""
    subject = f"New Lead: {lead.name} - {lead.interest}"
    
    # Create a more detailed notification
    text_content = f"""
    New Lead Submission:
    --------------------
    Name: {lead.name}
    Email: {lead.email}
    Phone: {lead.phone or 'Not provided'}
    Product Interest: {lead.interest}
    Message: {lead.message or 'No message provided'}
    Language: {lead.language}
    Received: {lead.created_at}
    """
    
    # Also create an HTML version for admin
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2a7a2a; color: white; padding: 20px; text-align: center; }}
            .details {{ background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2a7a2a; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Lead Submission</h1>
            </div>
            <p><strong>Name:</strong> {lead.name}</p>
            <p><strong>Email:</strong> {lead.email}</p>
            <p><strong>Phone:</strong> {lead.phone or 'Not provided'}</p>
            <p><strong>Product Interest:</strong> {lead.interest}</p>
            <p><strong>Language:</strong> {lead.language}</p>
            <div class="details">
                <p><strong>Message:</strong><br>{lead.message or 'No message provided'}</p>
            </div>
            <p><strong>Received:</strong> {lead.created_at}</p>
        </div>
    </body>
    </html>
    """
    
    results = []
    for recipient in current_app.config['ADMIN_EMAILS']:
        # Send both text and HTML versions to admin
        results.append(send_email(recipient, subject, text_content))
        # Uncomment the line below if you want to send HTML to admin too
        # results.append(send_email(recipient, subject, html_content, is_html=True))
    
    return all(results)