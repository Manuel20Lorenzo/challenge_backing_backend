import express from 'express'

const router = express.Router();

import authRoutes from './auth.routes.js';
import monedaRoutes from './moneda.routes.js';
import criptomonedaRoutes from './criptomoneda.routes.js';

router.use('/auth', authRoutes);
router.use('/moneda', monedaRoutes);
router.use('/criptomoneda', criptomonedaRoutes);

export default router;

