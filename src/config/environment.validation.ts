import * as Joi from 'joi';


export default Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'staging')
        .default('development'),
    PORT: Joi.number().default(5432),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DATABASE_SSL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
    API_VERSION: Joi.string().required(),
    UPLOAD_STRATEGY: Joi.string().valid('local', 's3').default('local'),
})