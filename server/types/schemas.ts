import Joi = require('joi')

export const primaryKeySchema = Joi.object({
    pk: Joi.string().required()
})

export const authenticationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const paginationSchema = {
    limit: Joi.string(),
    page: Joi.string()
}
