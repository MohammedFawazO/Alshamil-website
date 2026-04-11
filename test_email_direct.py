# Test script to debug SMTP issue
# Run this in your Django environment with: python test_email_direct.py

import smtplib
import os
import sys

# Fix output encoding
sys.stdout.reconfigure(encoding='utf-8')

# Load environment variables from .env
with open('.env', 'r') as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            key, value = line.strip().split('=', 1)
            os.environ[key] = value

# Now test using Django's config
from decouple import config

print("Testing Django config()...")
print(f"EMAIL_HOST_USER from config: {config('EMAIL_HOST_USER', default='NOT FOUND')}")
print(f"EMAIL_HOST_PASSWORD from config: {config('EMAIL_HOST_PASSWORD', default='NOT FOUND')}")
print(f"CONTACT_EMAIL from config: {config('CONTACT_EMAIL', default='NOT FOUND')}")
print(f"DEFAULT_FROM_EMAIL from config: {config('DEFAULT_FROM_EMAIL', default='NOT FOUND')}")

EMAIL_HOST = 'smtp.hostinger.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')

print(f"\nTesting SMTP connection...")
print(f"Host: {EMAIL_HOST}")
print(f"Port: {EMAIL_PORT}")
print(f"User: {EMAIL_HOST_USER}")
print(f"Password length: {len(EMAIL_HOST_PASSWORD)}")
print(f"From: {DEFAULT_FROM_EMAIL}")
print()

try:
    # Create SMTP connection
    server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    server.starttls()
    
    # Try to login
    print("Attempting to login...")
    server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    print("[OK] Login successful!")
    
    # Try to send a test email
    msg = "Subject: Test Email\n\nThis is a test email from Al Shamil website."
    server.sendmail(DEFAULT_FROM_EMAIL, DEFAULT_FROM_EMAIL, msg)
    print("[OK] Test email sent!")
    
    server.quit()
    print("\nAll tests passed!")
    
except smtplib.SMTPAuthenticationError as e:
    print(f"[ERROR] Authentication failed!")
    print(f"Error: {e}")
    
except smtplib.SMTPException as e:
    print(f"[ERROR] SMTP Error: {e}")
    
except Exception as e:
    print(f"[ERROR] {type(e).__name__}: {e}")