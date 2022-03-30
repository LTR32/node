'use strict';

const Joi = require("joi");

module.exports = [
    {
        method: 'DELETE',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            },
            auth : {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();

            await userService.removeUser(request.params.id);

            return '';
        }
    },

];
