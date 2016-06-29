'use strict';

const Boom = require('boom');
const ActivitiService = require('../service/activiti_service');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/applications',
        config: {
            handler: function(request, reply) {
                ActivitiService.getApplications(function(err, data) {
                    if(err) {
                        return reply(Boom.badRequest(err));
                    }
                    reply(data);
                });
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/applications/{id}/status',
        config: {
            handler: function(request, reply) {
                ActivitiService.getApplicationStatus(request.params.id, function(err, data) {
                    if(err) {
                        return reply(Boom.badRequest(err));
                    }
                    reply(data);
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/applications',
        config: {
            handler: function(request, reply) {
                ActivitiService.submitApplication(request.payload, {name: "Vaibhav"}, function(err, data) {
                    if(err) {
                        return reply(Boom.badRequest(err));
                    }
                    reply(data);
                });
            }
        }
    });

    next();
};

exports.register.attributes = {
    name : 'application_controller'
};
