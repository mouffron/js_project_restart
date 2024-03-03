'use strict';

module.exports = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        await userService.deleteUserById(request.params.id);

        return "operation successful"
    }
};
