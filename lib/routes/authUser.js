'use strict';

module.exports = {
    method: 'POST',
    path: '/user/login',
    options: {
        tags: ['api'],
        auth: false,
    },
    handler: async (request, h) => {
        const {username, password} = request.payload;
        return "";
    }
};
