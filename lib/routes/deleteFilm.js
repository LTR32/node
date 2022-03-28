'use strict';

const Joi = require("joi");

module.exports = [
    {
        method: 'DELETE',
        path: '/film/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer()
                })
            },
            auth: {
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const id = request.params.id;
            const { Film } = request.models();

            const filmDelete = await Film.query().delete().from("film").where(`id`, id);

            return filmDelete;
        }
    }
]