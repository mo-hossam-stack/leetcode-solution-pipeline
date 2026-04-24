"""
Production settings for LeetCode AI Formatter.
"""

from .base import *
import os

DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "yes")

# ALLOWED_HOSTS from environment (required for production)
if os.getenv("ALLOWED_HOSTS"):
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(",")
else:
    ALLOWED_HOSTS = []

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Cache configuration with fallback to local memory if REDIS_URL is not set
REDIS_URL = os.getenv("REDIS_URL", "")
if REDIS_URL:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.redis.RedisCache",
            "LOCATION": REDIS_URL,
        }
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        }
    }

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    # SECURE_SSL_REDIRECT is disabled - let the hosting platform handle HTTPS
else:
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False

# CORS configuration for production
cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
if cors_origins:
    CORS_ALLOWED_ORIGINS = cors_origins.split(",")
else:
    CORS_ALLOWED_ORIGINS = []
