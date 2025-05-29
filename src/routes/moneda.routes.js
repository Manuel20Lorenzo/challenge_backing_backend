import express from 'express';
import { monedaController } from '../controllers/moneda.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'
const router = express.Router();

/**
 * @swagger
 * /moneda:
 *   get:
 *     summary: Lista todas las monedas (requiere autenticación)
 *     tags: [Moneda]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de monedas
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token inválido
 */
router.get('', authenticateToken, monedaController.getAll);


/**
 * @swagger
 * /moneda:
 *   post:
 *     summary: Crear una nueva moneda (requiere autenticacion)
 *     tags: [Moneda]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - codigo
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Bolivares
 *               codigo:
 *                 type: string
 *                 example: VEF
 *     responses:
 *       201:
 *         description: Moneda creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 codigo:
 *                   type: string
 *       409:
 *         description: Moneda con ese nombre o código ya existe
 *       401:
 *         description: No autorizado (token no válido o ausente)
 *       500:
 *         description: Error interno del servidor
 */
router.post('', authenticateToken, monedaController.create);

export default router;
