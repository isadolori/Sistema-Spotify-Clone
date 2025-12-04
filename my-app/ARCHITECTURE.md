# 🎵 SpotifyClone - Arquitetura de Microsserviços

Bem-vindo ao SpotifyClone! Este projeto é uma aplicação web tipo Spotify estruturada para suportar uma arquitetura de microsserviços, com foco em escalabilidade e separação de responsabilidades.

## 📋 Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── Header.js        # Barra de navegação
│   ├── Player.js        # Player de música
│   ├── SongCard.js      # Card de música
│   ├── ArtistCard.js    # Card de artista
│   ├── AlbumCard.js     # Card de álbum
│   ├── SearchBar.js     # Barra de busca
│   ├── Loading.js       # Indicador de carregamento
│   └── ErrorAlert.js    # Alerta de erro
│
├── pages/               # Páginas principais
│   ├── Home.js         # Página inicial
│   ├── Login.js        # Autenticação
│   ├── Register.js     # Registro de usuário
│   └── Search.js       # Busca
│
├── context/            # Context API para estado global
│   ├── MusicContext.js    # Estado de músicas, artistas, álbuns
│   ├── UserContext.js     # Estado de autenticação e perfil
│   └── PaymentContext.js  # Estado de planos e assinaturas
│
├── services/           # Comunicação com microsserviços
│   ├── api.service.js     # Serviço HTTP genérico com retry
│   ├── music.service.js   # API do microsserviço de música
│   ├── user.service.js    # API do microsserviço de usuários
│   └── payment.service.js # API do microsserviço de pagamento
│
├── config/             # Configurações
│   └── api.config.js   # URLs e endpoints dos microsserviços
│
├── styles/             # Estilos CSS
│   ├── globals.css     # Estilos globais e variáveis CSS
│   ├── Header.css
│   ├── Player.css
│   ├── SongCard.css
│   ├── SearchBar.css
│   └── pages/          # Estilos de páginas
│       ├── Home.css
│       ├── Auth.css
│       └── Search.css
│
├── hooks/              # Custom Hooks (para futuro)
│   └── (a implementar)
│
├── utils/              # Funções utilitárias (para futuro)
│   └── (a implementar)
│
└── App.js             # Componente principal com roteamento
```

## 🏗️ Arquitetura de Microsserviços

O projeto está estruturado para comunicar com **3 microsserviços independentes**:

### 1. **Microsserviço de Música** (`music-service`)
- **Porta**: 3001
- **Responsabilidades**:
  - Listar e buscar músicas
  - Gerenciar artistas
  - Gerenciar álbuns
  - Gerenciar gêneros
  - Gerenciar playlists curatorias

**Endpoints**:
```
GET    /api/songs              - Listar músicas
GET    /api/songs/:id          - Detalhes da música
GET    /api/songs/search?q=    - Buscar músicas
GET    /api/artists            - Listar artistas
GET    /api/albums             - Listar álbuns
GET    /api/genres             - Listar gêneros
GET    /api/playlists          - Listar playlists
```

### 2. **Microsserviço de Usuários** (`user-service`)
- **Porta**: 3002
- **Responsabilidades**:
  - Autenticação (login/registro)
  - Perfil do usuário
  - Preferências de música
  - Histórico de reprodução
  - Recuperação de senha

**Endpoints**:
```
POST   /api/auth/register      - Registrar novo usuário
POST   /api/auth/login         - Fazer login
POST   /api/auth/logout        - Fazer logout
POST   /api/auth/refresh       - Renovar token
GET    /api/profile            - Obter perfil
PUT    /api/profile            - Atualizar perfil
PUT    /api/profile/preferences - Atualizar preferências
GET    /api/profile/history    - Histórico de reprodução
```

### 3. **Microsserviço de Pagamento** (`payment-service`)
- **Porta**: 3003
- **Responsabilidades**:
  - Gerenciar planos de assinatura
  - Gerenciar assinaturas de usuários
  - Processar pagamentos
  - Gerenciar métodos de pagamento
  - Gerar faturas

**Endpoints**:
```
GET    /api/plans              - Listar planos
POST   /api/subscriptions      - Criar assinatura
GET    /api/subscriptions/current - Assinatura atual
POST   /api/subscriptions/upgrade - Upgrade de plano
POST   /api/payments           - Processar pagamento
GET    /api/payments/invoices  - Listar faturas
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# URLs dos microsserviços
REACT_APP_MUSIC_SERVICE_URL=http://localhost:3001
REACT_APP_USER_SERVICE_URL=http://localhost:3002
REACT_APP_PAYMENT_SERVICE_URL=http://localhost:3003

# API URL principal (opcional)
REACT_APP_API_URL=http://localhost:3000
```

## 🚀 Como Começar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm start
```

A aplicação abrirá em `http://localhost:3000`

### 3. (Futuro) Configurar os microsserviços

Você precisará criar e rodar os 3 microsserviços nas portas especificadas. Cada um deve seguir o padrão de endpoints documentados acima.

## 📦 Dependências Principais

- **react**: Framework UI
- **react-dom**: Renderização no DOM
- **react-scripts**: Build tool

## 🎨 Design System

O projeto utiliza um design system baseado em Spotify com:

### Paleta de Cores
- Primária: `#1DB954` (Verde Spotify)
- Secundária: `#191414` (Preto)
- Terciária: `#282828` (Cinza escuro)

### Variáveis CSS Customizadas

Todos os estilos utilizam CSS Variables definidas em `src/styles/globals.css`:

```css
--primary-color: #1DB954
--bg-primary: #121212
--text-primary: #FFFFFF
--spacing-md: 16px
/* ... etc */
```

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React)                       │
│  Components → Context API → Services               │
└─────────────────────────────────────────────────────┘
           ↓         ↓         ↓
    ┌──────────┬──────────┬──────────┐
    │          │          │          │
┌───▼──┐ ┌────▼──┐ ┌────▼──┐
│Music │ │ User  │ │Payment│
│  API │ │  API  │ │  API  │
└──────┘ └───────┘ └───────┘
```

## 📝 Convenções de Código

### Services
- Métodos async/await
- Tratamento centralizado de erros
- Retry automático em erros recuperáveis
- Timeout configurável

### Components
- Functional components com Hooks
- Props bem documentadas
- Componentes reutilizáveis e simples

### Context
- Um context por domínio (Music, User, Payment)
- Dispatch de ações com useReducer
- useCallback para otimização

## 🔐 Autenticação

O token JWT é armazenado em `localStorage`:

```javascript
localStorage.setItem('authToken', token);
```

E incluído automaticamente em todas as requisições:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 🧪 Próximos Passos

1. **Implementar Microsserviços**: Criar os 3 microsserviços em Node.js/Express, Python/FastAPI, Java/Spring, etc.
2. **Adicionar React Router**: Substituir roteamento manual por `react-router-dom`
3. **Adicionar WebSocket**: Para atualizações em tempo real
4. **Implementar Testes**: Testes unitários com Jest e Vitest
5. **CI/CD**: Pipeline do GitHub Actions ou similar
6. **Containerização**: Docker e Docker Compose
7. **Documentação API**: Swagger/OpenAPI para os microsserviços

## 📚 Recursos Úteis

- [Documentação React](https://react.dev)
- [Context API](https://react.dev/reference/react/useContext)
- [Padrões de Microsserviços](https://microservices.io/)

## 📄 Licença

Este projeto é fornecido como exemplo de arquitetura. Sinta-se livre para usá-lo e modificá-lo.

---

**Desenvolvido com ❤️ para demonstrar boas práticas de arquitetura frontend preparada para microsserviços.**
