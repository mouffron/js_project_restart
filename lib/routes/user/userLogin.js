'use strict';

const Joi = require('joi');
const UserService = require('../../services/user');
const Jwt = require('@hapi/jwt');

const userService = new UserService();

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        auth: false,
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

        const { authenticated, role, message } = await userService.login(mail, password);

        if (authenticated) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    email: mail,
                    scope: role //Le scope du user
                },
                {
                    key: 'secret', // La clé qui est définit dans lib/auth/strategies/jwt.js
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );

            return token
        } else {
            return h.response({ message }).code(401);
        }
    }
};
