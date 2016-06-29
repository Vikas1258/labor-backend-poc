'use strict';

const Request = require('request');

module.exports = class ActivitiService {
    constructor() {

    }

    static getApplications(callback) {
        Request({
            url: "http://localhost:9090/runtime/process-instances?processDefinitionKey=process&size=1000",
            method: "GET",
            auth: {
                user: 'kermit',
                pass: 'kermit'
            }
        }, function(err, httpResponse, body) {
            if(err) {
                return callback(err, null);
            }
            if (httpResponse.statusCode == 200) {
                return callback(null, body);
            }
            else {
                return callback(body, null);
            }
        });
    }

    static getApplicationStatus(applicationId, callback) {
        Request({
            url: "http://localhost:9090/runtime/executions/" + applicationId + "/activities",
            method: "GET",
            auth: {
                user: 'kermit',
                pass: 'kermit'
            }
        }, function(err, httpResponse, body) {
            if(err) {
                return callback(err, null);
            }
            if (httpResponse.statusCode == 200) {
                return callback(null, body);
            }
            else {
                return callback(body, null);
            }
        });
    }

    static submitApplication(form, citizen, callback) {
        var params = {
            processDefinitionKey: "process",
            variables: [
                {
                    name: "form",
                    value: form,
                },
                {
                    name: "citizen",
                    value: citizen
                }
            ]
        };

        Request({
            url: "http://localhost:9090/runtime/process-instances",
            method: "POST",
            body: params,
            json: true,
            auth: {
                user: 'kermit',
                pass: 'kermit'
            }
        }, function(err, httpResponse, body) {
            if(err) {
                return callback(err, null);
            }
            if (httpResponse.statusCode == 201) {
                return callback(null, body);
            }
            else {
                return callback(body, null);
            }
        });

    }
}
