'use strict';

module.exports = {
    method: 'PATCH',
    path: '/film/{id}',
    options: {
        tags: ['api'],
        auth : {
            scope: ['admin']
        } 
    },
    handler: async (request, h) => {
        const id = request.params.id;
        const { User } = request.models();

        const updateUser = await User.query().update("user").set();

        return "";
    }
};
