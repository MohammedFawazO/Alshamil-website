"""
Test SMTP connection to Hostinger
Run this script to debug the email sending issue
"""
import os
import django
import sys

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alshamil.settings')
django.setup()

from django.core.mail import get_connection
from django.conf import settings

print("Testing SMTP connection to Hostinger...")
print(f"EMAIL_HOST: {settings.EMAIL_HOST}")
print(f"EMAIL_PORT: {settings.EMAIL_PORT}")
print(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
print(f"DEFAULT_FROM_EMAIL: {settings.DEFAULT_FROM_EMAIL}")
print()

try:
    # Try to open a connection
    connection = get_connection()
    connection.open()
    print("✓ SMTP connection successful!")
    connection.close()
except Exception as e:
    print(f"✗ SMTP connection failed!")
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {str(e)}")