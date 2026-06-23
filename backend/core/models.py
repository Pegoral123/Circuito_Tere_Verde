from django.db import models

class HorarioFuncionamento(models.Model):
    DIAS_DA_SEMANA = [
        ('SEG', 'Segunda-feira'),
        ('TER', 'Terça-feira'),
        ('QUA', 'Quarta-feira'),
        ('QUI', 'Quinta-feira'),
        ('SEX', 'Sexta-feira'),
        ('SAB', 'Sábado'),
        ('DOM', 'Domingo'),
    ]

    dia = models.CharField(max_length=3, choices=DIAS_DA_SEMANA)
    hora_abertura = models.TimeField()
    hora_fechamento = models.TimeField()
    parque = models.ForeignKey(
        'Parque',
        on_delete=models.CASCADE,
        related_name='horarios',
        null=False,
        blank=False
    )

    class Meta:
        verbose_name = "Horário de Funcionamento"
        verbose_name_plural = "Horários de Funcionamento"
        ordering = ['dia']

    def __str__(self):
        ##get_nome_do_campo_display()--> Função do django para traze automatico o nome de visão daquele campo
        return f"{self.get_dia_display()}: {self.hora_abertura.strftime('%H:%M')} - {self.hora_fechamento.strftime('%H:%M')}"

class Parque(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    localizacao = models.CharField(max_length=255)

    def __str__(self):
        return self.nome


class Trilha(models.Model):
    class Dificuldade(models.IntegerChoices):
        FACIL = 1, 'Fácil'
        MODERADO = 2, 'Moderado'
        DIFICIL = 3, 'Difícil'
    STATUS_CHOICES = [
        ('ABERTA', 'Aberta'),
        ('FECHADA', 'Fechada'),
        ('EM_MANUTENCAO', 'Em Manutenção'),
    ]


    parque = models.ForeignKey(Parque, on_delete=models.CASCADE, related_name='trilhas')
    nome = models.CharField(max_length=100)
    descricao = models.TextField(verbose_name="Descrição",blank=True)
    extensao_km = models.DecimalField(max_digits=5, decimal_places=2)
    dificuldade = models.IntegerField(
        choices=Dificuldade.choices,
        default=Dificuldade.MODERADO,
        verbose_name="Dificuldade"
    )
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='ABERTA')

    def __str__(self):
        return f"{self.nome} ({self.parque.nome}) - {self.status} - {self.extensao_km} km - {self.dificuldade}"
    
  
class Evento(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.SET_NULL, null=True, blank=True , related_name='eventos')
    titulo = models.CharField(max_length=100)
    data = models.DateField()
    local = models.CharField(max_length=255)
    descricao = models.TextField()   
    imagem_url = models.URLField("Imagem",blank=True)
    def __str__(self):
        return f"{self.titulo} ({self.parque.nome})"

class Novidade(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.SET_NULL, null=True, blank=True , related_name='novidades')
    trilha = models.ForeignKey(Trilha, on_delete=models.SET_NULL, null=True, blank=True , related_name='novidades')
    titulo = models.CharField(max_length=100)
    conteudo = models.TextField()
    data_publicacao = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.trilha} - {self.titulo}"

