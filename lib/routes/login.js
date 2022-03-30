'use strict';
const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload:  Joi.object({
                username: Joi.string().example('LTR'),
                password: Joi.string().example('12345678')
            })
    }
},
handler: async (request, h) => {
    const { userService } = request.services();

    return await userService.login(request.payload);
    }
};
