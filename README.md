# Challenge  BANKING TECHNOLOGIES CONSULTING,C.A. -  Backend
API REST para gestión de usuarios, monedas y criptomonedas con autenticación JWT.


## Tecnologías usadas
- Node.js + Express
- TypeORM + PostgreSQL
- JWT para autenticación
- Swagger para documentación
- bcrypt para hashing de contraseñas

## Requisitos previos
- Node.js (v18+ recomendado)
- PostgreSQL (v12+)
- npm

## Configuración inicial
1. Clonar el repositorio

Clonar el repositorio

```
bash
https://github.com/Manuel20Lorenzo/challenge_backing_backend.git
cd challenge_banking_backend
```
2. Instalar dependencias

```
bash
npm install
```
3. Crear archivo .env en la raíz del proyecto con la configuración:

```
env 

NODE_ENV = development
# Puerto del servidor
PORT=3000

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASS=password
DB_NAME=mydatabase

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h
```

## Ejecutar la aplicación
- Para desarrollo (con hot reload usando nodemon):

```
bash
npm run dev
```

La API quedará corriendo en http://localhost:3000/api.

###  Documentación Swagger
La documentación está disponible en:


```
http://localhost:3000/api/docs
```

### Endpoints principales
- POST /api/auth/register - Registrar usuario
```
curl
curl -X 'POST' \
  'http://localhost:3000/api/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "usuario@correo.com",
  "password": "secret123"
}'
```
- POST /api/auth/login - Login (genera token JWT)
```
curl
curl -X 'POST' \
  'http://localhost:3000/api/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "usuario@correo.com",
  "password": "secret123"
}'
```
#### Requiere Token
- GET /api/moneda: lista todas las monedas.
```
curl -X 'GET' \
  'http://localhost:3000/api/moneda' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I'
```
- POST /api/moneda: crear nueva moneda.
```
curl -X 'POST' \
  'http://localhost:3000/api/moneda' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I' \
  -H 'Content-Type: application/json' \
  -d '{
  "nombre": "Bolivares",
  "codigo": "VEF"
}'
```
- GET /api/criptomoneda: lista criptomonedas con su relación de moneda.
```
curl -X 'GET' \
  'http://localhost:3000/api/criptomoneda' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I'
```
- GET /api/criptomoneda?moneda=XYZ: lista criptomonedas con su relación de
moneda, en donde se obtenga la criptomoneda que esté relacionada con
la moneda XYZ.
```
curl -X 'GET' \
  'http://localhost:3000/api/criptomoneda?moneda=USD' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I'
```
- POST /api/criptomonedas: crear criptomoneda asignada a una moneda.
```
curl -X 'POST' \
  'http://localhost:3000/api/criptomoneda' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I' \
  -H 'Content-Type: application/json' \
  -d '{
  "nombre": "Ethereum",
  "simbolo": "ETH",
  "monedaIds": [
    1
  ]
}'
```
- PUT /api/criptomonedas/:id: actualizar datos de la criptomoneda.
```
url -X 'PUT' \
  'http://localhost:3000/api/criptomoneda/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidXN1YXJpb0Bjb3JyZW8uY29tIiwiaWF0IjoxNzQ4NTcyMjA4LCJleHAiOjE3NDg1NzU4MDh9.X_I65xHMYskIgXVoKI99yzChYNDcIGI4lHbI8VfCi2I' \
  -H 'Content-Type: application/json' \
  -d '{
  "nombre": "Ethereum",
  "simbolo": "ETH",
  "monedas": [
    1,
    2
  ]
}'
```

## Ejecutar base de datos con Docker Compose
Para facilitar la gestión de la base de datos PostgreSQL, puedes usar Docker Compose solo para levantar la base de datos en un contenedor.


1. Pre-requisitos
- Tener instalado Docker
- Tener instalado Docker Compose

2. Levantar el contenedor
Ejecuta el siguiente comando en la raíz del proyecto (donde está el archivo docker-compose.yml):
```
bash
docker-compose up -d
```

## 📄 Modelos de Datos

### 🧑‍💼 User (`users`)
| Campo     | Tipo     | Descripción             |
|-----------|----------|-------------------------|
| id        | int      | Clave primaria autogenerada |
| email     | varchar  | Email único del usuario |
| password  | varchar  | Contraseña encriptada   |

---

### 💵 Moneda (`monedas`)
| Campo     | Tipo     | Descripción             |
|-----------|----------|-------------------------|
| id        | int      | Clave primaria autogenerada |
| nombre    | varchar  | Nombre único de la moneda |
| codigo    | varchar  | Código único (ej. USD)  |

**Relaciones:**
- Una moneda puede estar asociada a muchas criptomonedas (`many-to-many`).

---

### 🪙 Criptomoneda (`criptomonedas`)
| Campo     | Tipo     | Descripción                |
|-----------|----------|----------------------------|
| id        | int      | Clave primaria autogenerada |
| nombre    | varchar  | Nombre único (ej. Bitcoin) |
| simbolo   | varchar  | Símbolo único (ej. BTC)    |

**Relaciones:**
- Una criptomoneda puede estar asociada a muchas monedas (`many-to-many`).

---

