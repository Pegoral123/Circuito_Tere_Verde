<div align="center">

# 🌿 Circuito Terê Verde

**Plataforma de Ecoturismo para Teresópolis - RJ**

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-REST_Framework-092E20?style=flat-square&logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

</div>

---

## 📖 Sobre o Projeto

O **Circuito Terê Verde** é um MVP full-stack voltado para o fomento e facilitação do **turismo ecológico em Teresópolis - RJ**. A plataforma conecta moradores e turistas às belezas naturais da região, oferecendo um catálogo detalhado de parques, trilhas e atrações com foco em sustentabilidade e ecoturismo.

---

## ✨ Funcionalidades

### 🔐 Painel Administrativo
- Autenticação segura com gestão de usuários via Django Admin
- CRUD completo de **Parques**, **Trilhas**, **Eventos** e **Novidades**
- Publicação de alertas e atualizações de condições das trilhas

### 🌍 Interface Pública
- Catálogo de parques com detalhes de trilhas associadas
- Listagem de eventos futuros
- Feed de novidades e atualizações em tempo real

### ⚙️ API RESTful
- Endpoints públicos otimizados para consumo do frontend
- Serialização aninhada (trilhas exibidas dentro do detalhe do parque)
- Configuração de CORS para integração segura
- Documentação interativa via Swagger

---

## 📋 Requisitos

### Funcionais

#### Módulo Administrativo
| ID | Descrição |
|:---|:---|
| RF01 | Autenticação segura do administrador (Login) |
| RF02 | CRUD de Parques (Serra dos Órgãos, Três Picos, Montanhas de Teresópolis) |
| RF03 | Gerenciamento de Trilhas associadas a um parque |
| RF04 | Gerenciamento de Eventos (data, local e descrição) |
| RF05 | Publicação de Novidades e alertas de condições |

#### Módulo Visitante (Público)
| ID | Descrição |
|:---|:---|
| RF06 | Visualização da lista de parques na página inicial |
| RF07 | Acesso aos detalhes de um parque e suas trilhas |
| RF08 | Visualização de eventos futuros |
| RF09 | Visualização de notícias e atualizações recentes |

### Não-Funcionais

| ID | Categoria | Descrição |
|:---|:---|:---|
| RNF01 | Desempenho | Respostas ágeis na API com suporte a múltiplos usuários simultâneos |
| RNF02 | Segurança | Área administrativa protegida com senhas criptografadas |
| RNF03 | Usabilidade | Interface intuitiva para administradores e visitantes |
| RNF04 | Responsividade | Frontend adaptado para Desktop, Tablet e Mobile |
| RNF05 | Versionamento | Código-fonte versionado no GitHub |
| RNF06 | Documentação | README com instruções claras de instalação e uso |
| RNF07 | Manutenibilidade | Estrutura de diretórios organizada e código limpo |

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Finalidade |
|:---|:---|
| React.js + TypeScript | Framework principal da SPA |
| Vite | Build tool rápido e otimizado |
| Tailwind CSS | Estilização responsiva |
| PWA | Suporte à instalação em dispositivos móveis |
| Supabase | Integração de banco de dados e autenticação via client |

### Backend
| Tecnologia | Finalidade |
|:---|:---|
| Python 3.9+ | Linguagem base |
| Django + Django REST Framework | API, serialização e views |
| SQLite / PostgreSQL | Banco de dados relacional via ORM |

---

## 📁 Estrutura do Repositório

```
circuito-tere-verde/
├── frontend/               # Single Page Application (React + Vite)
│   ├── src/
│   │   ├── components/     # AttractionCard, AttractionDetail, RouteCard, RouteDetail...
│   │   ├── services/       # Integração com a API
│   │   └── ...
│   └── vite.config.ts
│
└── backend/                # API REST (Django)
    └── core/               # App principal
        ├── models.py       # Trilhas, Eventos, Funcionamento
        ├── serializers.py
        ├── views.py
        └── urls.py
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.9+
- [Git](https://git-scm.com/)

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/circuito-tere-verde.git
cd circuito-tere-verde
```

---

### 2. Configurar o Backend

```bash
cd backend

# Criar e ativar o ambiente virtual
python -m venv venv

# Linux/Mac:
source venv/bin/activate

# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Aplicar migrações
python manage.py migrate

# Iniciar o servidor
python manage.py runserver
```

---

### 3. Configurar o Frontend

```bash
# Em outro terminal, a partir da raiz do projeto:
cd frontend

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

---

#### URLs do Backend em Produção

| Recurso | URL |
| Django Admin | `https://projeto-mvp-mobile-back-end.onrender.com/admin/login/?next=/admin/` |
| Front-End| `https://projeto-mvp-mobile.vercel.app` |

## 👨‍💻 Desenvolvedores

| Nome 
|:---|
| Jhonathan Pegoral |
| Carlos Henrique | 
