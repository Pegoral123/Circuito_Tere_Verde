from rest_framework import serializers
from .models import Parque,Trilha,Evento, Novidade,HorarioFuncionamento


class HorarioFuncionamentoSerializer(serializers.ModelSerializer):
    dia_extenso = serializers.CharField(source='get_dia_display', read_only=True)
    class Meta:
        model = HorarioFuncionamento
        fields = ["dia", "hora_abertura", "hora_fechamento","dia_extenso"]

class ParqueSlimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parque
        fields = ['id', 'nome', 'localizacao']
class TrilhaSerializer(serializers.ModelSerializer):
    parque = ParqueSlimSerializer(read_only=True)
    dificuldade_nome = serializers.CharField(source='get_dificuldade_display', read_only=True)

    class Meta:
        model = Trilha
        fields = ['id', 'parque', 'nome', 'descricao', 'extensao_km', 'dificuldade', 'dificuldade_nome', 'status']
class EventoSerializer(serializers.ModelSerializer):
    parque = ParqueSlimSerializer(read_only=True)

    class Meta:
        model = Evento
        fields = '__all__'
class NovidadeSerializer(serializers.ModelSerializer):
    parque = ParqueSlimSerializer(read_only=True)
    trilha = TrilhaSerializer(read_only=True)

    class Meta:
        model = Novidade
        fields = '__all__'
class ParqueSerializer(serializers.ModelSerializer):
    horarios = HorarioFuncionamentoSerializer(many=True, read_only=True)

    class Meta:
        model = Parque
        fields = ['id', 'nome', 'descricao', 'localizacao', 'horarios']

    