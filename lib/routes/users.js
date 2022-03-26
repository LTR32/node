'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/users',
        options: {
            tags: ['api'],
            auth : {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            return await userService.listUser();
        }
    },

];