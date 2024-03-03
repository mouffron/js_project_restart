'use strict';

module.exports = {
    method: 'delete',
    path: '/movie/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
    },
    handler: async (request, h) => {
        const { movieService } = request.services();

        await movieService.deleteMovieById(request.params.id);

        return "operation successful"
    }
};
