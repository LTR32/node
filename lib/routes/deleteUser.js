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
                    id: Joi.number().integer()
                })
            },
            auth : {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const id = request.params.id;
            const { User } = request.models();

            const userDelete = await User.query().delete().from("user").where(`id`, id);

            return userDelete;
        }
    },

];
