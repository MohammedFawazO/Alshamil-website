from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .forms import ContactForm
import json
import logging

logger = logging.getLogger(__name__)


def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')
    
def services(request):
    return render(request, 'services.html')


def contact(request):
    """Render the contact page"""
    form = ContactForm()
    return render(request, 'contact.html', {'form': form})

@csrf_exempt  # Only for development - remove in production
@require_http_methods(["POST"])
def contact_submit(request):
    """Handle contact form submission via AJAX"""
    try:
        # Parse JSON data from request
        data = json.loads(request.body)
        form = ContactForm(data)
        
        if form.is_valid():
            # Get cleaned data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            service = form.cleaned_data.get('service', 'Not specified')
            message = form.cleaned_data['message']
            
            # Prepare email content
            subject = f'New Contact Form Submission from {name}'
            
            email_body = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Phone: {phone}
Service Required: {service}

Message:
{message}

---
This email was sent from the Al Shamil Turning LLC contact form.
            """
            
            # Send email
            try:
                # Send to company - USE EmailMessage for custom "from" address
                company_email = EmailMessage(
                    subject=subject,
                    body=email_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,  # Business email (must be verified in Gmail "Send as")
                    to=[settings.CONTACT_EMAIL],  # Temp Gmail that receives emails
                    reply_to=[email]  # Customer can reply directly to the form submitter
                )
                company_email.send(fail_silently=False)
                
                # Send confirmation email to the customer
                confirmation_email = EmailMessage(
                    subject='Thank you for contacting Al Shamil Turning LLC',
                    body=f"""Dear {name},

Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.

Best regards,
Al Shamil Turning LLC
AL Hayl Industrial Area, Behind National Hypermarket
Fujairah, United Arab Emirates
Phone: +971 50 579 7905
Email: info@alshamilturning.com
Website: https://alshamilturning.com""",
                    from_email=settings.DEFAULT_FROM_EMAIL,  # Business email
                    to=[email],
                    reply_to=[settings.DEFAULT_FROM_EMAIL]
                )
                confirmation_email.send(fail_silently=True)
                
                logger.info(f"Contact form submitted successfully by {name} ({email})")
                
                return JsonResponse({
                    'success': True,
                    'message': 'Thank you for contacting us! We will get back to you within 24 hours.'
                })
                
            except Exception as e:
                logger.error(f"Error sending email: {str(e)}")
                return JsonResponse({
                    'success': False,
                    'message': 'There was an error sending your message. Please try again or contact us directly.'
                }, status=500)
        else:
            return JsonResponse({
                'success': False,
                'message': 'Please fill in all required fields correctly.',
                'errors': form.errors
            }, status=400)
            
    except json.JSONDecodeError:
        logger.error("Invalid JSON data received in contact form")
        return JsonResponse({
            'success': False,
            'message': 'Invalid data format'
        }, status=400)
    except Exception as e:
        logger.error(f"Unexpected error in contact form: {str(e)}")
        return JsonResponse({
            'success': False,
            'message': 'An unexpected error occurred. Please try again.'
        }, status=500)

def privacy(request):
    return render(request, 'privacy_policy.html')

def terms(request):
    return render(request, 'terms_and_conditions.html')