//const swaggerJSDoc = require('swagger-jsdoc');
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Challenge Backing - Backend',
            version: '1.0.0',
            description: 'API REST para gestión de usuarios, monedas y criptomonedas con autenticación JWT.',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Aquí colocamos los archivos donde Swagger buscará las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
