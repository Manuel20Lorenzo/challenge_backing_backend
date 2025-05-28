import { getAll, create, getForMoneda } from '../services/criptomoneda.service.js'


export const criptomonedaController = {

    getAll: async (req, res) => {
        try {

            const { moneda } = req.query;

            let criptos;
            if (moneda) {
                criptos = await getForMoneda(moneda); // servicio filtrado
            } else {
                criptos = await getAll(); // servicio sin filtro
            }

            res.status(200).json({
                message: 'Lista de criptomonedas',
                data: criptos,
            });
        } catch (error) {
            if (error.code === 'INVALID_CREDENTIALS') {
                return res.status(400).json({ message: error.message });
            }
            console.error('Error al loguear usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    create: async (req, res) => {
        try {
            console.log('req.body:', req.body)
            const { nombre, simbolo, monedaIds } = req.body;
            const cripto = await create({ nombre, simbolo, monedaIds });

            return res.status(201).json({
                message: 'Criptomoneda creada exitosamente',
                data: cripto,
            });

        } catch (error) {
            if (error.code === 'EXISTE_CRYPT') {
                return res.status(302).json({ message: error.message });
            }

            if (error.code === 'EXISTE_CRYPT') {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        //res.send('Crear usuario');
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, simbolo, monedas } = req.body;

            const criptomonedaActualizada = await criptomonedaService.update(id, {
                nombre,
                simbolo,
                monedas,
            });

            return res.status(200).json({
                message: 'Criptomoneda actualizada correctamente',
                data: criptomonedaActualizada,
            });
        } catch (error) {
            console.error('Error al actualizar criptomoneda:', error);
            return res.status(error.status || 500).json({
                message: error.message || 'Error interno del servidor',
            });
        }



    }


}
