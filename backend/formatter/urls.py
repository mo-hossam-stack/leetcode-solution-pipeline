"""
URL configuration for formatter app.
"""

from django.urls import path
from .views import FormatView
from .health import HealthCheckView

urlpatterns = [
    path("format/", FormatView.as_view(), name="format"),
    path("health/", HealthCheckView.as_view(), name="health"),
]
