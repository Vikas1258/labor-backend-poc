'use strict';

var ready = function(server, next) {
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize(server.env.sequelize.database, server.env.sequelize.username, server.env.sequelize.password, {
        host: server.env.sequelize.host,
        dialect: server.env.sequelize.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        },
        storage: server.env.sequelize.storage
      });

      var db = {
        //User : require('./user')(sequelize, Sequelize),
      }

    server.decorate('server', 'db', db);
    next();
};

exports.register = function (server, options, next) {
    server.dependency('env', ready);
    next();
};

exports.register.attributes = {
    name : 'db'
};
