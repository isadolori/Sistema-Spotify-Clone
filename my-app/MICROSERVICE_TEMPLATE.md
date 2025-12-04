# Template para Microsserviço de Música

Este é um template de exemplo para começar a implementar o microsserviço de música.

## Opções de Tecnologia

Escolha uma das opções abaixo:

### Opção 1: Node.js + Express (Recomendado para começar)

```bash
mkdir music-service
cd music-service
npm init -y
npm install express cors dotenv mongoose
npm install --save-dev nodemon
```

**package.json**:
```json
{
  "name": "music-service",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "mongoose": "^7.0.0"
  }
}
```

**src/app.js**:
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas de Música
app.get('/api/songs', (req, res) => {
  // TODO: Implementar listagem de músicas
  res.json({
    data: [
      {
        id: 1,
        title: 'Song Example',
        artist: { id: 1, name: 'Artist Name' },
        album: { id: 1, name: 'Album Name' },
        duration: '3:45'
      }
    ]
  });
});

app.get('/api/songs/:id', (req, res) => {
  // TODO: Implementar detalhes da música
  const { id } = req.params;
  res.json({ id, title: 'Song Title' });
});

app.get('/api/artists', (req, res) => {
  // TODO: Implementar listagem de artistas
  res.json({ data: [] });
});

app.get('/api/albums', (req, res) => {
  // TODO: Implementar listagem de álbuns
  res.json({ data: [] });
});

app.get('/api/genres', (req, res) => {
  // TODO: Implementar listagem de gêneros
  res.json({ data: [] });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Music Service rodando na porta ${PORT}`);
});
```

### Opção 2: Python + FastAPI

```bash
mkdir music-service
cd music-service
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install fastapi uvicorn pydantic
```

**main.py**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Music Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/songs")
async def list_songs():
    """Listar músicas"""
    return {
        "data": [
            {
                "id": 1,
                "title": "Song Example",
                "artist": {"id": 1, "name": "Artist Name"},
                "album": {"id": 1, "name": "Album Name"},
                "duration": "3:45"
            }
        ]
    }

@app.get("/api/songs/{song_id}")
async def get_song(song_id: int):
    """Detalhes da música"""
    return {"id": song_id, "title": "Song Title"}

@app.get("/api/artists")
async def list_artists():
    """Listar artistas"""
    return {"data": []}

@app.get("/api/albums")
async def list_albums():
    """Listar álbuns"""
    return {"data": []}

@app.get("/api/genres")
async def list_genres():
    """Listar gêneros"""
    return {"data": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
```

### Opção 3: Java + Spring Boot

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

```java
@SpringBootApplication
public class MusicServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(MusicServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "*")
public class SongController {
    
    @GetMapping
    public ResponseEntity<?> listSongs() {
        // TODO: Implementar
        return ResponseEntity.ok(new HashMap<>());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getSong(@PathVariable Long id) {
        // TODO: Implementar
        return ResponseEntity.ok(new HashMap<>());
    }
}
```

---

## Estrutura Recomendada para o Microsserviço

Independente da tecnologia escolhida:

```
music-service/
├── src/
│   ├── controllers/
│   │   ├── songs.controller.js
│   │   ├── artists.controller.js
│   │   ├── albums.controller.js
│   │   └── genres.controller.js
│   │
│   ├── services/
│   │   ├── song.service.js
│   │   ├── artist.service.js
│   │   └── album.service.js
│   │
│   ├── routes/
│   │   ├── songs.routes.js
│   │   ├── artists.routes.js
│   │   └── albums.routes.js
│   │
│   ├── models/
│   │   ├── song.model.js
│   │   ├── artist.model.js
│   │   ├── album.model.js
│   │   └── genre.model.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── constants.js
│   │
│   └── app.js
│
├── tests/
│   └── songs.test.js
│
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## Endpoints que Precisam Ser Implementados

```javascript
// Músicas
GET    /api/songs               // Listar com paginação
GET    /api/songs/:id           // Detalhes
POST   /api/songs               // Criar (admin)
PUT    /api/songs/:id           // Atualizar (admin)
DELETE /api/songs/:id           // Deletar (admin)
GET    /api/songs/search?q=     // Buscar

// Artistas
GET    /api/artists
GET    /api/artists/:id
POST   /api/artists             // Admin
PUT    /api/artists/:id         // Admin
DELETE /api/artists/:id         // Admin

// Álbuns
GET    /api/albums
GET    /api/albums/:id
POST   /api/albums              // Admin
PUT    /api/albums/:id          // Admin
DELETE /api/albums/:id          // Admin

// Gêneros
GET    /api/genres
GET    /api/genres/:id
POST   /api/genres              // Admin
PUT    /api/genres/:id          // Admin
DELETE /api/genres/:id          // Admin

// Playlists Curatorias
GET    /api/playlists
GET    /api/playlists/:id
POST   /api/playlists           // Admin
PUT    /api/playlists/:id       // Admin
DELETE /api/playlists/:id       // Admin
```

## Modelo de Dados Sugerido

### Song
```javascript
{
  id: ObjectId,
  title: String,
  artistId: ObjectId,      // referência ao Artist
  albumId: ObjectId,       // referência ao Album
  genreId: ObjectId,       // referência ao Genre
  duration: Number,        // em segundos
  releaseDate: Date,
  coverUrl: String,
  audioUrl: String,
  plays: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Artist
```javascript
{
  id: ObjectId,
  name: String,
  bio: String,
  imageUrl: String,
  followers: Number,
  verified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Album
```javascript
{
  id: ObjectId,
  name: String,
  artistId: ObjectId,      // referência ao Artist
  releaseDate: Date,
  coverUrl: String,
  songs: [ObjectId],       // referências a Songs
  createdAt: Date,
  updatedAt: Date
}
```

### Genre
```javascript
{
  id: ObjectId,
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Playlist
```javascript
{
  id: ObjectId,
  name: String,
  description: String,
  imageUrl: String,
  songs: [ObjectId],       // referências a Songs
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Próximos Passos

1. ✅ Clonar este template
2. ✅ Escolher tecnologia (Node/Python/Java)
3. ✅ Configurar banco de dados (MongoDB/PostgreSQL)
4. ✅ Implementar controllers
5. ✅ Adicionar autenticação JWT
6. ✅ Implementar testes
7. ✅ Containerizar (Docker)
8. ✅ Documentar API (Swagger/OpenAPI)

---

**Dica**: Comece implementando apenas alguns endpoints para testar a integração com o frontend.
