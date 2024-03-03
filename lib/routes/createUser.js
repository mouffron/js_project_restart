'use strict';

const Joi = require('joi')
const { string } = require('joi');

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3),
                lastName: Joi.string().required().min(3),
                username: Joi.string().required(),
                mail: Joi.string().required(),
                password: Joi.string().required().min(8)
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
};
