import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import router from './routes/index.js';

import errorHandler from './middlewares/errorHandler.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import { AppDataSource } from './config/ormconfig.js';


const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado a la base de datos PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos', err);
  });

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', router);

// Error handler
app.use(errorHandler);

export default app;
