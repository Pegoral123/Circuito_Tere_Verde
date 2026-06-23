from rest_framework import viewsets
from .models import Parque, Trilha, Evento, Novidade
from .serializers import TrilhaSerializer, ParqueSerializer, EventoSerializer, NovidadeSerializer
from drf_spectacular.utils import extend_schema


@extend_schema(tags=['Parque'])
class ParqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Parque.objects.all()
    serializer_class = ParqueSerializer

@extend_schema(tags=['Trilha'])
class TrilhaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trilha.objects.all()
    serializer_class = TrilhaSerializer

@extend_schema(tags=['Evento'])
class EventoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Evento.objects.all().order_by('-data')
    serializer_class = EventoSerializer

@extend_schema(tags=['Novidades'])
class NovidadeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Novidade.objects.all().order_by('-data_publicacao')
    serializer_class = NovidadeSerializer