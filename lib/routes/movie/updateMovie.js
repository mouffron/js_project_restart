'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('Movie ID')
            }),
            payload: Joi.object({
                title: Joi.string(),
                description: Joi.string(),
                releaseDate: Joi.string(),
                director: Joi.string(),
            })
        }
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        await movieService.updateMovieById(request.params.id, request.payload);

        return "operation successful"

    }
};
