'use strict';

const MySQL = require('mysql');
const Hapi = require('@hapi/hapi');

const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node'
});

connection.connect();

module.exports = {
    method: 'GET',
    path: '/users',
    options: {
        tags: ['api'],
    },
    handler: function() {
        connection.query('SELECT id, firstName, lastName, createdAt, updatedAt', function(error, results, fields) {
            if(error) throw error;
            console.log(results);
            reply(results);
        });
    }
};
