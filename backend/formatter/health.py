from django.http import JsonResponse
from django.views import View
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip('"')
GROQ_MODEL = os.getenv("GROQ_MODEL", "").strip('"') or "llama-3.3-70b-versatile"


class HealthCheckView(View):
    def get(self, request):
        issues = []

        if not GROQ_API_KEY:
            issues.append("GROQ_API_KEY not set")
        if not os.getenv("SECRET_KEY", "").strip('"'):
            issues.append("SECRET_KEY not set")

        allowed_hosts = os.getenv("ALLOWED_HOSTS", "")
        cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")

        return JsonResponse(
            {
                "status": "unhealthy" if issues else "healthy",
                "issues": issues if issues else None,
                "config": {
                    "debug": os.getenv("DEBUG", "False"),
                    "allowed_hosts": allowed_hosts or "not set",
                    "cors_origins": cors_origins or "not set",
                },
            }
        )
