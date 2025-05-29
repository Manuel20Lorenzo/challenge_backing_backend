### Challenge Banking Backend
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
- POST /api/auth/login - Login (genera token JWT)
- GET /api/moneda - Lista monedas (requiere token)
- GET /api/criptomoneda - Lista criptomonedas (requiere token)
- POST /api/criptomoneda - Crear criptomoneda (requiere token)
- PUT /api/criptomoneda/:id - Actualizar criptomoneda (requiere token)