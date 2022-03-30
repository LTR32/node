'use strict';
const Joi = require('joi');

module.exports = {
    method: 'PATCH',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required()
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8),
                mail: Joi.string().regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
                username: Joi.string(),
                scope: Joi.array().items(Joi.string()).example(["user", "admin"]),
            })
        },
        auth : {
            scope: ['admin']
        } 
    },
    handler: async (request, h) => {
        const id = request.params.id;
        const { userService } = request.services();

        return await userService.updateUser(id, request.payload);
    }
};
