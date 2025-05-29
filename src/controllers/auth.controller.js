import { registerUser, loginUser } from '../services/auth.service.js'
export const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log({ email, password })
            const user = await loginUser({ email, password })
            return res.status(200).send(user)
        } catch (error) {
            
            console.error('Error al loguear usuario:', error);
            res.status(error.code || 500).json({ message: error.message || 'Error interno del servidor' });
        }
    },

    create: async (req, res) => {
        try {
            console.log('req.body:', req.body)
            const { email, password } = req.body;
            console.log('email:', email)
            const user = await registerUser({ email, password });
            return res.status(201).json({
                message: 'Usuario creado exitosamente',
                user,
            });
        } catch (error) {
            if (error.message === 'El usuario ya existe') {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        //res.send('Crear usuario');
    },

}
