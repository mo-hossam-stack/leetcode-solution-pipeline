"""
URL configuration for formatter app.
"""

from django.urls import path
from .views import FormatView

urlpatterns = [
    path("format/", FormatView.as_view(), name="format"),
]
