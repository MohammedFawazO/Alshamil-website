from django.http import FileResponse
from django.conf import settings
import os

def serve_favicon(request, filename):
    file_path = os.path.join(settings.BASE_DIR, 'static', filename)
    return FileResponse(
        open(file_path, 'rb'),
        content_type='image/x-icon' if filename.endswith('.ico') else 'image/png'
    )