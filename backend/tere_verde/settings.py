from pathlib import Path
import os
from dotenv import load_dotenv

# Base directory do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Carrega variáveis de ambiente do arquivo .env (se existir)
load_dotenv(BASE_DIR / '.env')

# SECRET_KEY: em produção, defina a variável DJANGO_SECRET_KEY no .env ou no ambiente
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# DEBUG (leitura segura de variável)
DEBUG =os.getenv('DEBUG', 'False').lower() == 'true'

# Módulo de URL do projeto
ROOT_URLCONF = 'tere_verde.urls'

# WSGI application path
WSGI_APPLICATION = 'tere_verde.wsgi.application'


DATABASES = {
    'default': {
        # Lendo as variáveis direto do arquivo .env
        'ENGINE': os.getenv('DB_ENGINE'),
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'), 
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT')
    }
}
REST_FRAMEWORK = {
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

JAZZMIN_SETTINGS = {
    "site_title": "Circuito Verde",
    "site_header": "Circuito Verde",
    "site_brand": "Circuito Verde",

    # Logo do menu lateral
    "site_logo": "img/logo.png",

    # Logo da tela de login
    "login_logo": "img/logo.png",
    # Opcional
    "welcome_sign": "Bem-vindo ao Circuito Verde",
}
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',  
    'rest_framework',
    'corsheaders',
    'drf_spectacular',
    'drf_spectacular_sidecar'
]

STATIC_URL = '/static/'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    "*",
    os.getenv('URL_FRONT_END_AUTORIZADO_1')
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",    
    "http://localhost:8080",
    os.getenv('URL_FRONT_END_AUTORIZADO_1')
]

#internalization
USE_I18N = True
USE_TZ = True
TIME_ZONE = "America/Sao_Paulo"
LANGUAGE_CODE = 'pt-br'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

SPECTACULAR_SETTINGS = {
    'TITLE': 'API Parques - Circuito Verde',
    'DESCRIPTION': 'Documentação oficial da API do projeto Circuito Verde.\n\n'
                   'Endpoints públicos para consulta de Parques.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,

    # melhora o visual do swagger
    'SWAGGER_UI_SETTINGS': {
        'filter': True,     # barra de busca
        'deepLinking': True,
        'defaultModelsExpandDepth': -1,   # esconde modelos
    },
}
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [
    BASE_DIR / "static",
]
# Adicione isso para o WhiteNoise comprimir e servir o CSS rapidinho:
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

