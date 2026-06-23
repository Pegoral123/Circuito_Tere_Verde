from django.contrib import admin
from .models import Parque, Trilha, Evento, Novidade, HorarioFuncionamento


class HorarioFuncionamentoInline(admin.TabularInline):
    model = HorarioFuncionamento
    extra = 1


@admin.register(Parque)
class ParqueAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'localizacao')
    search_fields = ('nome', 'localizacao')
    inlines = [HorarioFuncionamentoInline]


@admin.register(Trilha)
class TrilhaAdmin(admin.ModelAdmin):
    list_display = ('parque', 'nome','descricao', 'extensao_km', 'dificuldade', 'status')
    search_fields = ('nome', 'parque__nome')


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('parque', 'titulo', 'data', 'local', 'descricao')
    search_fields = ('titulo', 'parque__nome')


@admin.register(Novidade)
class NovidadeAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'conteudo', 'data_publicacao')
    search_fields = ('titulo',)


@admin.register(HorarioFuncionamento)
class HorarioFuncionamentoAdmin(admin.ModelAdmin):
    list_display = ("parque", "dia", "hora_abertura", "hora_fechamento")
    list_filter = ("dia", "parque")
    ordering = ("parque", "dia")
