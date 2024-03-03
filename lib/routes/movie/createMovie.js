'use strict';

const Joi = require('joi')
const { string } = require('joi');

module.exports = {
    method: 'post',
    path: '/movie',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                releaseDate: Joi.string().required(),
                director: Joi.string().required(),
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.createMovie(request.payload);
    }
};
