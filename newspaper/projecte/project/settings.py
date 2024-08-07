"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 5.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path
import logging
import logging.config
from django.utils.log import DEFAULT_LOGGING

logger = logging.getLogger('django')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-%97%bb+odk2y_ao^4dq+o8$u*-9*ukdtpb4#*(_wwp+39x_@na'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.flatpages',
    'django_filters',
    'newapp',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.yandex',
    'django_apscheduler',
]

SITE_ID = 1

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'none'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
    'allauth.account.middleware.AccountMiddleware',

    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

WSGI_APPLICATION = 'project.wsgi.application'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'cache_files'),
    }
}


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_DIRS = [
    BASE_DIR / 'static'
]

LOGIN_REDIRECT_URL = "/news"

ACCOUNT_FORMS = {"signup": "accounts.forms.CustomSignupForm"}

SOCIALACCOUNT_PROVIDERS = {
    'yandex': {
        'APP': {
            'client_id': 'd90a1ad31c8644d9b48639d934e37dd8',
            'secret': 'a15209d7094d463dad464e4e93dc82c9',
            'key': ''
        }
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_PORT = 465
EMAIL_HOST_USER = "herimant9999@yandex.ru"
EMAIL_HOST_PASSWORD = "qcyukksbvaqaopdo"
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True

DEFAULT_FROM_EMAIL = "herimant9999@yandex.ru"

SERVER_EMAIL = "example@yandex.ru"
MANAGERS = (
    ('Ivan', 'ivan@yandex.ru'),
    ('Petr', 'petr@yandex.ru'),
)

ADMINS = (
    ('vasy', 'anton@yandex.ru'),
)

CELERY_BROKER_URL = 'redis-16161.c91.us-east-1-3.ec2.redns.redis-cloud.com:16161'
CELERY_RESULT_BACKEND = 'redis-16161.c91.us-east-1-3.ec2.redns.redis-cloud.com:16161'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'style': '{',

    'formatters': {
        'simple': {
            'format': '%(asctime)s %(levelname)s %(message)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',
        },
        'warning': {
            'format': '%(asctime)s %(levelname)s %(message)s %(pathname)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',
        },
        'error_and_critical': {
            'format': '%(asctime)s %(levelname)s %(message)s %(pathname)s %(exc_info)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',

        },
        'general_': {
            'format': '%(asctime)s %(levelname)s %(module)s %(message)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',
        },
        'errors_': {
            'format': '%(asctime)s %(levelname)s %(message)s %(pathname)s %(exc_info)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',
        },
        'email_': {
            'format': '%(asctime)s %(levelname)s %(message)s %(pathname)s',
            'datefmt': '%d.%m.%Y %H-%M-%S',
        },
    },

    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
    },

    'handlers': {
        'console_debug': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'console_warning': {
            'level': 'WARNING',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'warning',
        },
        'console_error': {
            'level': 'ERROR',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'error_and_critical',
        },
        'general_log': {
            'level': 'INFO',
            'filters': ['require_debug_false'],
            'class': 'logging.FileHandler',
            'filename': 'logs/general.log',
            'formatter': 'general_',
        },
        'errors_log': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'logs/errors.log',
            'formatter': 'errors_',
        },
        'security_log': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/security.log',
            'formatter': 'general_',
        },
        'email': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
            'formatter': 'email_',
        },
    },
    'loggers': {
        'django': {
            'level': 'DEBUG',
            'handlers': ['console_debug', 'console_warning', 'console_error', 'general_log'],
            'propagate': True,
        },
        'django.request': {
            'level': 'ERROR',
            'handlers': ['errors_log', 'email'],
            'propagate': True,
        },
        'django.server': {
            'level': 'ERROR',
            'handlers': ['errors_log', 'email'],
            'propagate': True,
        },
        'django.template': {
            'level': 'ERROR',
            'handlers': ['errors_log'],
            'propagate': True,
        },
        'django.db.backends': {
            'level': 'ERROR',
            'handlers': ['errors_log'],
            'propagate': True,
        },
        'django.security': {
            'level': 'INFO',
            'handlers': ['security_log'],
            'propagate': True,
        },
    },
}