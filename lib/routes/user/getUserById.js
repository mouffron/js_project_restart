'use strict';

const Joi = require('joi');
module.exports = {
    method: 'get',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('User ID')
            }),
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.getUserById(request.params.id);
    }
};
