# SpotifyClone - Arquitetura de Microsserviços

Uma aplicação web tipo Spotify construída com React e arquitetura de microsserviços escalável e profissional.

## Características

- **Arquitetura de Microsserviços**: Preparada para 3 microsserviços independentes
- **Frontend Moderno**: React com Context API e Hooks
- **Serviços Reutilizáveis**: Camada de comunicação com APIs centralizada
- **Tratamento de Erros**: Sistema robusto com retry automático
- **Autenticação JWT**: Segurança integrada
- **Design Responsivo**: Mobile-first
- **Bem Documentado**: Guias de extensão e arquitetura

## Tecnologias

- **Frontend**: React 19+, Context API, CSS3
- **HTTP Client**: Fetch API com retry automático
- **Estado Global**: Context API com useReducer
- **Estilos**: CSS puro com CSS Variables

## Arquitetura

```
Frontend (React)
    ↓
Context API (MusicContext, UserContext, PaymentContext)
    ↓
Services (music.service, user.service, payment.service)
    ↓
API Service (HTTP com retry)
    ↓
Microsserviços (3001, 3002, 3003)
```

## Microsserviços

### 1. Música Service (Port 3001)
- Gerencia: Músicas, Artistas, Álbuns, Gêneros, Playlists

### 2. Usuário Service (Port 3002)
- Gerencia: Autenticação, Perfil, Preferências, Histórico

### 3. Pagamento Service (Port 3003)
- Gerencia: Planos, Assinaturas, Pagamentos, Faturas

## Quick Start

### Pré-requisitos
- Node.js 16+
- npm 8+

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local

# 3. Iniciar aplicação em desenvolvimento
npm start
```

A aplicação abrirá em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Rodar Testes

```bash
npm test
```

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas principais
├── context/            # Estado global (Context API)
├── services/           # Comunicação com APIs
├── config/             # Configurações
├── styles/             # Estilos CSS
├── App.js              # Componente raiz
└── index.js            # Entrada da aplicação
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para estrutura completa.

## 🔧 Configuração

### Variáveis de Ambiente (.env.local)

```env
REACT_APP_MUSIC_SERVICE_URL=http://localhost:3001
REACT_APP_USER_SERVICE_URL=http://localhost:3002
REACT_APP_PAYMENT_SERVICE_URL=http://localhost:3003
```

## Documentação

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura geral e diagramas
- **[EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)** - Como estender o projeto
- **[ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md)** - Diagramas visuais
- **[MICROSERVICE_TEMPLATE.md](./MICROSERVICE_TEMPLATE.md)** - Templates para microsserviços
- **[CHECKLIST.md](./CHECKLIST.md)** - Checklist de implementação

## Como Usar

### Acessar Páginas

- Home: `http://localhost:3000/`
- Login: `http://localhost:3000/login`
- Registro: `http://localhost:3000/register`
- Busca: `http://localhost:3000/search`

### Estrutura de Dados Esperada

As APIs devem retornar dados no seguinte formato:

```javascript
// GET /api/songs
{
  data: [
    {
      id: "123",
      title: "Song Title",
      artist: {
        id: "artist-id",
        name: "Artist Name"
      },
      album: {
        id: "album-id",
        name: "Album Name"
      },
      coverUrl: "https://...",
      duration: "3:45"
    }
  ]
}
```

## Autenticação

O sistema usa JWT armazenado em localStorage:

```javascript
// Token é enviado em todas as requisições autenticadas
Authorization: Bearer <token>
```

## Próximos Passos

1. **Implementar Microsserviços**
   - Veja [MICROSERVICE_TEMPLATE.md](./MICROSERVICE_TEMPLATE.md)
   - Comece com o serviço de música
   
2. **Conectar APIs**
   - Atualize `.env.local` com URLs dos microsserviços
   - Teste cada endpoint
   
3. **Adicionar Mais Funcionalidades**
   - Veja [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)
   - Adicione novas páginas e componentes

## Desenvolvimento

### Rodar em Desenvolvimento com Auto-reload
```bash
npm start
```

### Debug no Browser
```
Chrome DevTools → React Developer Tools → Components/Profiler
```

## Responsividade

A aplicação é responsiva e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## Design System

Baseado em Spotify com cores:
- Primária: `#1DB954` (Verde)
- Fundo: `#121212` (Preto)
- Texto: `#FFFFFF` (Branco)

Todas as cores usam CSS Variables em `src/styles/globals.css`

## Fluxo de Dados

```
User Interaction → Component Handler → Context Action → 
Service Method → ApiService Request → Microsserviço Response → 
Context Update → Component Re-render → UI Updated
```

## Tratamento de Erros

Erros são tratados automaticamente em múltiplos níveis:

1. **ApiService** - Retry automático, timeout
2. **Services** - Lançam erros estruturados
3. **Context** - Armazena e exibe erros
4. **Components** - Mostram ErrorAlert

## Testes (Futuro)

```bash
# Testes unitários
npm test

# Testes com cobertura
npm test -- --coverage
```

## Docker (Futuro)

```bash
# Build image
docker build -t spotify-clone .

# Run container
docker run -p 3000:3000 spotify-clone
```

## Licença

MIT - Sinta-se livre para usar e modificar

## Contribuições

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Suporte

Para dúvidas:
1. Consulte [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Veja exemplos em [EXTENSION_GUIDE.md](./EXTENSION_GUIDE.md)
3. Verifique templates em [MICROSERVICE_TEMPLATE.md](./MICROSERVICE_TEMPLATE.md)

## Começar Agora

```bash
# Instalar
npm install

# Configurar
cp .env.example .env.local

# Rodar
npm start

# Visitar
open http://localhost:3000
```

---

**Desenvolvido com ❤️ para demonstrar boas práticas de arquitetura frontend para microsserviços.**
