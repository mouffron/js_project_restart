'use strict';

const Joi = require('joi');
const UserService = require('../services/user');

const userService = new UserService();

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                mail: Joi.string().email().required(),
                password: Joi.string().required()
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const { mail, password } = request.payload;

        const { authenticated, message } = await userService.login(mail, password);

        if (authenticated) {
            return { login: 'successful' };
        } else {
            return h.response({ message }).code(401);
        }
    }
};
