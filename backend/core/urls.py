from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'parques', views.ParqueViewSet)
router.register(r'trilhas', views.TrilhaViewSet)
router.register(r'eventos', views.EventoViewSet)
router.register(r'novidades', views.NovidadeViewSet)

urlpatterns = [
    path('', include(router.urls)), 
     ] 