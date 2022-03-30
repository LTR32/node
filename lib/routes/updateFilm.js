'use strict';
const Joi = require('joi');

module.exports = {
    method: 'PATCH',
    path: '/film/{id}',
    options: {
        tags: ['api'],
        auth : {
            scope: ['admin']
        },
        validate: {
            params:  Joi.object({
                id: Joi.number().integer().required()
            }), 
            payload: Joi.object({
                title: Joi.string().min(3).example('Star wars 4'),
                description: Joi.string().min(3).example('Premier film Star wars'),
                releaseDate: Joi.date(),
                director: Joi.string().min(3).example('George Lucas'),
            }) 
    }
},
    handler: async (request, h) => {
        const id = request.params.id;
        const { User } = request.models();

        const updateUser = await User.query().update("user").set();

        return "";
    }
};
