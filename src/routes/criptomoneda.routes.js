import express from 'express';
import { criptomonedaController } from '../controllers/criptomoneda.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'
const router = express.Router();


/**
 * @swagger
 * /criptomoneda:
 *   get:
 *     summary: Lista todas las criptomonedas o filtra por moneda
 *     tags: [Criptomonedas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: moneda
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre o código de la moneda relacionada para filtrar criptomonedas
 *         example: USD
 *     responses:
 *       200:
 *         description: Lista de criptomonedas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lista de criptomoneda
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: "Bitcoin"
 *                       simbolo:
 *                         type: string
 *                         example: "BTC"
 *                       monedas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             nombre:
 *                               type: string
 *                               example: "Dólar"
 *                             codigo:
 *                               type: string
 *                               example: "USD"
 */


router.get('', authenticateToken, criptomonedaController.getAll);

/**
 * @swagger
 * /criptomoneda:
 *   post:
 *     summary: Crea una nueva criptomoneda
 *     tags: [Criptomonedas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Ethereum
 *               simbolo:
 *                 type: string
 *                 example: ETH
 *               monedaIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *     responses:
 *       201:
 *         description: Criptomoneda creada exitosamente
 *       400:
 *         description: Error al crear la criptomoneda
 */
router.post('', authenticateToken, criptomonedaController.create);


/**
 * @swagger
 * /criptomoneda/{id}:
 *   put:
 *     summary: Actualiza una criptomoneda por su ID
 *     tags: [Criptomonedas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la criptomoneda a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ethereum"
 *               simbolo:
 *                 type: string
 *                 example: "ETH"
 *               monedas:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *     responses:
 *       200:
 *         description: Criptomoneda actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Criptomoneda actualizada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Ethereum"
 *                     simbolo:
 *                       type: string
 *                       example: "ETH"
 *                     monedas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nombre:
 *                             type: string
 *                             example: "Dólar"
 *                           codigo:
 *                             type: string
 *                             example: "USD"
 *       404:
 *         description: Criptomoneda no encontrada
 *       400:
 *         description: Error de validación o datos inválidos
 */
router.put('/:id', authenticateToken, criptomonedaController.update);

export default router;