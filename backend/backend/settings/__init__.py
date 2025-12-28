import os

# Determine environment
environment = os.getenv('DJANGO_ENV', 'development')

if environment == 'production':
    from .production import *
elif environment == 'development':
    from .development import *
else:
    from .development import *  # Default fallback