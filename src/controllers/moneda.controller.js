import { getAll, create } from '../services/moneda.service.js'
export const monedaController = {
    getAll: async (req, res) => {
        try {
            const moneda = await getAll()
            return res.status(200).send(moneda)
        } catch (error) {

            console.error('Error al listar moneda:', error);
            res.status(500).json({ message: 'Error interno del servidor', error });
        }
    },
    
    create: async (req, res) => {
        try {
            console.log('req.body:', req.body)
            const { nombre, codigo } = req.body;
            const moneda = await create({ nombre, codigo });
            return res.status(201).json({
                message: 'Moneda creada con exito',
                data: moneda,
            });
        } catch (error) {
            if (error.code === 'MONEDA_EXISTS') {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        //res.send('Crear usuario');
    }

}
