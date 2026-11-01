import json
import logging
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import EmailMessage
from django.core.validators import validate_email
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST
from .models import Message

log = logging.getLogger(__name__)


def home(request):
    return render(request, 'index.html')


@require_POST
def contact(request):
    try:
        d = json.loads(request.body)
        name, email, msg = d['name'].strip(), d['email'].strip(), d['message'].strip()
        validate_email(email)
        if not (name and msg):
            raise ValueError
    except (ValueError, KeyError, TypeError, AttributeError, ValidationError):
        return JsonResponse({'ok': False}, status=400)

    ptype = str(d.get('type', ''))[:50]
    Message.objects.create(name=name[:100], email=email, project_type=ptype, message=msg[:3000])

    # send to your inbox (message is already saved in admin even if this fails)
    pwd = settings.EMAIL_HOST_PASSWORD
    if pwd and 'PASTE_APP_PASSWORD' not in pwd:
        try:
            EmailMessage(
                subject=f'Portfolio: {ptype} inquiry from {name}',
                body=f'Name: {name}\nEmail: {email}\nType: {ptype}\n\n{msg[:3000]}',
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.CONTACT_RECEIVER],
                reply_to=[email],
            ).send()
        except Exception:
            log.exception('Contact email failed')
    return JsonResponse({'ok': True})