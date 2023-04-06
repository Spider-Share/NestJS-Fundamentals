import * as Joi from '@hapi/joi';

// export default () => ({
//     environment: process.env.NODE_ENV || 'development',
//     database: {
//         MONGO_URI: Joi.string().required(),
//         MONGO_PORT: Joi.number().default(process.env.PORT || +process.env.MONGO_PORT).required(), // testar no servidor
//     }
// });

export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.MONGO_URI,
        port: Joi.number().default(+process.env.MONGO_PORT || 3000).required(), // testar no servidor
    }
});