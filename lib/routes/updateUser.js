'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('User ID')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3),
                lastName: Joi.string().min(3),
                username: Joi.string(),
                password: Joi.string().min(8),
                mail: Joi.string().email()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        await userService.updateUserById(request.params.id, request.payload);

        return "operation successful"

    }
};
