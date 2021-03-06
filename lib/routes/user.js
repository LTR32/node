'use strict';

const Joi = require('joi')

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        auth: false,
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
            mail: Joi.string().email().example("doussineau47@gmail.com"),
          })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload) + userService.sendEmail("${request.query.mail}");
    }
};