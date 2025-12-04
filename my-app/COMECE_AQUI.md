# COMECE AQUI!

Arquivo guia dos primeiros passos

## Instalar e Rodar 

```bash
# Instalar dependências
npm install

# Copiar configuração
cp .env.example .env.local

# Rodar
npm start
```

 Abra `http://localhost:3000` 

## UI 

- Header com navegação
- Página Home com destaques
- Botões de Login/Register
- Barra de busca
- Cards de músicas, artistas, álbuns

**Clique e explore!** (nao funcionara sem backend, mas tá lá)

## Estrutura

Leia nesta ordem:
1. **QUICK_START.md** - Resumo visual ⭐ COMECE AQUI
2. **ARCHITECTURE.md** - Como funciona
3. **FILE_INDEX.md** - Onde está cada coisa

## criar Backend (30+ minutos)

Escolha uma opção:

### Opção A: Node.js + Express (Recomendado)
```bash
mkdir music-service
cd music-service
npm init -y
npm install express cors dotenv mongoose
```

Ver template completo em: **MICROSERVICE_TEMPLATE.md**

### Opção B: Python + FastAPI
```bash
mkdir music-service
cd music-service
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

### Opção C: Usar um serviço pronto
Procure por "Spotify API" ou "Music API" existentes

## Conectar Frontend com Backend

### Passo A: Atualizar .env.local
```env
REACT_APP_MUSIC_SERVICE_URL=http://localhost:3001
REACT_APP_USER_SERVICE_URL=http://localhost:3002
REACT_APP_PAYMENT_SERVICE_URL=http://localhost:3003
```

### Passo B: Rodar Frontend + Backend
```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Backend (ex: Node.js)
cd music-service
npm start
```

### Passo C: Testar
- Abra DevTools (F12)
- Vá em Network tab
- Clique em um botão
- Veja se a requisição aparece ✅

## 6️⃣ Expandir o Projeto

Veja: **EXTENSION_GUIDE.md**

Você pode:
- Adicionar novas páginas
- Criar novos componentes
- Adicionar funcionalidades
- Estender os services

---

## Mapa Rápido

| Preciso de... | Onde encontro... |
|---|---|
| Entender arquitetura | ARCHITECTURE.md |
| Começar rápido | QUICK_START.md ⭐ |
| Encontrar arquivo | FILE_INDEX.md |
| Estender projeto | EXTENSION_GUIDE.md |
| Template de backend | MICROSERVICE_TEMPLATE.md |
| Checklist | CHECKLIST.md |
| Variáveis de ambiente | .env.example |
| Instruções completas | README_NOVO.md |

---

## 🛠️ Troubleshooting Rápido

### Erro: "Cannot find module"
```bash
# Instale as dependências
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Use outra porta
PORT=3001 npm start
```

### Erro: "API not responding"
```bash
# Verifique:
1. .env.local tem URLs corretas?
2. Backend está rodando?
3. DevTools → Network tab mostra erro?
```

### Erro: "CORS error"
```javascript
// Backend precisa ter CORS habilitado
app.use(cors());
```

---

## 📞 Perguntas Frequentes

**P: Como uso isso?**
R: Rode `npm start` e vá para http://localhost:3000

**P: Preciso de um backend?**
R: Sim, mas você implementa. Veja MICROSERVICE_TEMPLATE.md

**P: Qual tecnologia usar?**
R: Node.js/Express (mais fácil), Python/FastAPI ou Java/Spring

**P: Posso mudar as cores?**
R: Sim! Vá em `src/styles/globals.css` e mude as CSS Variables

**P: Como adiciono uma nova página?**
R: Veja EXTENSION_GUIDE.md seção "Adicionando Novas Páginas"

**P: Como testo a integração?**
R: DevTools (F12) → Network tab → veja requisições

---

## ✨ Próximas 3 Horas

| Tempo | O que fazer |
|---|---|
| 0:00 - 0:10 | `npm install && npm start` |
| 0:10 - 0:20 | Explorar UI / ler QUICK_START.md |
| 0:20 - 1:00 | Criar primeira versão do backend |
| 1:00 - 2:00 | Conectar e testar |
| 2:00 - 3:00 | Expandir (novos endpoints, componentes) |

---

## 🎬 Começar AGORA

```bash
npm install && npm start
```

Então abra: http://localhost:3000

---

## 📖 Depois de Começar

Uma vez que tudo estiver rodando:

1. Leia **ARCHITECTURE.md** - Entender profundamente
2. Leia **MICROSERVICE_TEMPLATE.md** - Para fazer backend
3. Leia **EXTENSION_GUIDE.md** - Para adicionar features
4. Consulte **CHECKLIST.md** - Para não esquecer nada

---

## 💡 Dica Final

**Não tente entender tudo de uma vez!**

1. Primeiro: rode o projeto
2. Depois: entenda como funciona
3. Por fim: expanda e customize

---

Dúvidas, consulte os documentos. Tudo está documentado! 📚
