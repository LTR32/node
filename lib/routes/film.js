'use strict';

const Joi = require("joi");

module.exports = {
    method: 'POST',
    path: '/film',
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: Joi.object({
                title: Joi.string().required().min(3).example("Forrest Gump").description("Title of the film"),
                description: Joi.string().required().min(3).example("Film à voir absolument"),
                releaseDate: Joi.date().example("October 05, 1994"),
                director: Joi.string().min(3).example("Robert Zemeckis"),
            })
        }
    },
    handler: async (request, h) => {
        const { filmService } = request.services();
        return await filmService.createFilm(request.payload) + filmService.sendEmail();
    }
};
