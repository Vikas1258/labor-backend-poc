'use strict';

var ready = function(server, next) {

    server.route({
        method: 'GET',
        path: '/{param*}',
        config : {
            handler: {
                directory: {
                    path: ['public', 'node_modules']
                }
            },
            auth: false
        }
    });

    next();
}

exports.register = function (server, options, next) {
    server.dependency('inert', ready);
    next();
};

exports.register.attributes = {
    name : 'static_controller'
};
