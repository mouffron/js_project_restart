'use strict';

const Joi = require('joi');
module.exports = {
    method: 'get',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Movie ID')
            }),
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.getMovieById(request.params.id);
    }
};
