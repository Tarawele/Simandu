# from datetime import datetime
# from app import db

# class Lead(db.Model):
#     """Database model for storing lead information"""
#     __tablename__ = 'leads'
    
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), nullable=False, index=True)
#     phone = db.Column(db.String(20), nullable=False)
#     interest = db.Column(db.String(50), nullable=False)
#     message = db.Column(db.Text, nullable=False)
#     language = db.Column(db.String(10), default='en')
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     last_updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
#     status = db.Column(db.String(20), default='new')  # new, contacted, converted
    
#     def __repr__(self):
#         return f'<Lead {self.email}>'