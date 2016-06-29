'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Db = require('./models/db');
const Env = require('./middleware/env');

const StaticController = require('./controllers/static_controller');
const ApplicationController = require('./controllers/application_controller');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 9999,
});

var plugins = [
    {
        register: Inert,
        options: {}
    },
    {
        register: Db,
        options: {}
    },
    {
        register: Env,
        options: {}
    },
    {
        register: ApplicationController,
        options: {}
    },
    {
        register: StaticController,
        options: {}
    }
    ];

//Register plugins
server.register(plugins, (err) => {
    if(err) {
        throw(err);
    }

    // Start the server
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
