# DIAGRAMA DA ARQUITETURA

## Arquitetura Geral

```
┌────────────────────────────────────────────────────────────────┐
│                    NAVEGADOR DO USUÁRIO                        │
│                  React Application (Port 3000)                 │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                    ┌─────────┼─────────┐
                    │         │         │
        ┌───────────▼──┐  ┌──▼────────┐ ┌──▼────────────┐
        │  Microsserviço  │  │ Microser-│  │ Microsserviço│
        │  de Música   │  │ viço de │  │ de Pagamento │
        │  (Port 3001) │  │Usuários │  │ (Port 3003) │
        │              │  │(Port 3002)│  │              │
        └───┬──────────┘  └──┬───────┘  └──┬───────────┘
            │                 │              │
            │                 │              │
        ┌───▼─────┐        ┌──▼──────┐   ┌──▼────────┐
        │ Database│        │Database │   │  Database │
        │ Música  │        │Usuários │   │ Pagamento│
        └─────────┘        └─────────┘   └──────────┘
```

## Fluxo de Dados - Exemplo: Buscar Músicas

```
1. Usuário digita na SearchBar
        │
        ▼
2. Dispara handleSearch(query)
        │
        ▼
3. MusicContext.searchSongs(query)
        │
        ▼
4. MusicService.searchSongs(query)
        │
        ▼
5. ApiService.get("http://localhost:3001/api/songs?search=query")
        │
        ▼
6. ✓ Resposta recebida
        │
        ▼
7. Dispatch SET_SONGS action
        │
        ▼
8. State atualizado
        │
        ▼
9. Componentes renderizam com novas músicas
```

## Fluxo de Autenticação

```
┌─────────┐
│ Usuário │
│clica em │
│ Login   │
└────┬────┘
     │
     ▼
┌─────────────────┐
│ Form Login      │
│ (email/pass)    │
└────┬────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ UserContext.login(email, password)  │
└────┬────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────┐
│ UserService.login(email, password)               │
│ POST /api/auth/login                             │
└────┬─────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────┐
│ User Service (Port 3002)                         │
│ - Valida credenciais                             │
│ - Gera JWT token                                 │
│ - Retorna token + dados do usuário               │
└────┬─────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────┐
│ Token armazenado em localStorage                 │
│ setUser() - State atualizado                     │
└────┬─────────────────────────────────────────────┘
     │
     ▼
┌──────────────────────────────────────────────────┐
│ Redirecionado para Home                          │
│ Header mostra "Bem-vindo, [Nome]"                │
└──────────────────────────────────────────────────┘
```

## Estrutura de Pastas Detalhada

```
my-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Header.js
│   │   ├── Player.js
│   │   ├── SongCard.js
│   │   ├── ArtistCard.js
│   │   ├── AlbumCard.js
│   │   ├── SearchBar.js
│   │   ├── Loading.js
│   │   └── ErrorAlert.js
│   │
│   ├── pages/                  # Páginas principais
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Search.js
│   │
│   ├── context/                # Estado Global (Context API)
│   │   ├── MusicContext.js
│   │   ├── UserContext.js
│   │   └── PaymentContext.js
│   │
│   ├── services/               # Comunicação com APIs
│   │   ├── api.service.js      # HTTP genérico
│   │   ├── music.service.js    # API de Música
│   │   ├── user.service.js     # API de Usuários
│   │   └── payment.service.js  # API de Pagamento
│   │
│   ├── config/                 # Configurações
│   │   └── api.config.js
│   │
│   ├── styles/                 # Estilos CSS
│   │   ├── globals.css         # Estilos globais
│   │   ├── Header.css
│   │   ├── Player.css
│   │   ├── SongCard.css
│   │   ├── ArtistCard.css
│   │   ├── AlbumCard.css
│   │   ├── Loading.css
│   │   ├── ErrorAlert.css
│   │   ├── SearchBar.css
│   │   └── pages/
│   │       ├── Home.css
│   │       ├── Auth.css
│   │       └── Search.css
│   │
│   ├── hooks/                  # Custom Hooks (futuro)
│   │   └── (exemplo: useAuth, useFetch)
│   │
│   ├── utils/                  # Funções utilitárias (futuro)
│   │   └── (exemplo: formatTime, parseDate)
│   │
│   ├── App.js                  # Componente raiz
│   ├── App.css
│   ├── index.js                # Entrada da aplicação
│   ├── index.css
│   ├── setupTests.js
│   └── reportWebVitals.js
│
├── .env.example                # Exemplo de variáveis
├── .gitignore
├── ARCHITECTURE.md             # Documentação de arquitetura
├── EXTENSION_GUIDE.md          # Guia de extensão
├── package.json
├── package-lock.json
└── README.md
```

## Padrão de Comunicação com Microsserviços

```
Frontend                          Microsserviço
   │                                    │
   ├─ GET /api/songs?limit=10 ────────►│
   │                                    │
   │◄──── { songs: [...] } ────────────┤
   │                                    │
   ├─ POST /api/auth/login ───────────►│
   │  { email, password }               │
   │                                    │
   │◄──── { token, user } ─────────────┤
   │                                    │
   ├─ GET /api/playlists ─────────────►│
   │  Header: Authorization: Bearer ... │
   │                                    │
   │◄──── { playlists: [...] } ───────┤
```

## Ciclo de Vida de uma Requisição

```
1. TRIGGER
   └─ Usuário interage com UI (clique, submit, etc)

2. STATE CHANGE
   └─ Atualiza state no Context

3. SERVICE CALL
   └─ Chama método em service.js

4. API REQUEST
   └─ ApiService.get/post/put/delete faz a requisição

5. WAIT
   └─ Aguarda resposta do microsserviço (com retry se falhar)

6. RESPONSE HANDLING
   ├─ Sucesso: atualiza state com dados
   └─ Erro: atualiza state com erro

7. RE-RENDER
   └─ React renderiza componentes com novo state

8. UI UPDATE
   └─ Usuário vê atualização na tela
```

## Estados Possíveis de uma Requisição

```
┌─────────────┐
│   IDLE      │  Estado inicial
└──────┬──────┘
       │ Requisição iniciada
       ▼
┌─────────────┐
│  LOADING    │  Aguardando resposta
└──────┬──────┘
       │
   ┌───┴────┬──────────────┐
   │        │              │
   ▼        ▼              ▼
┌─────┐ ┌──────┐    ┌────────────┐
│IDLE │ │ERROR │    │SUCCESS     │
└─────┘ └──────┘    └────────────┘
(retry)  (mostrar   (exibir dados)
         mensagem)
```

---

Esta arquitetura permite que você:
- Escalefacilmente adicione novos microsserviços
- Desenvolva frontend e backend independentemente
- Compartilhe dados entre componentes sem prop drilling
- Tratecentralizadamente erros e loading
- Implemente retry automático
- Funcione offline (com cache futuro)
