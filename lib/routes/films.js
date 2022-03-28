'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/films',
        options: {
            tags: ['api'],
            auth : {
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { filmService } = request.services();

            return await filmService.listFilm();
        }
    },

];