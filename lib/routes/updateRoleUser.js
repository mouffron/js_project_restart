'use strict';

const Joi = require('joi');
const UserService = require('../services/user');

const userService = new UserService();

module.exports = {
    method: 'put',
    path: '/user/role/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin'],
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().greater(0).required()
            }),
            payload: Joi.object({
                role: Joi.string().valid('user', 'admin').required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        await userService.updateUserRole(request.params.id, request.payload);

        return "operation successful"
    }
};
