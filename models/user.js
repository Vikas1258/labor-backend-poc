module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
      underscored: true,
      freezeTableName: true // Model tableName will be the same as the model name
  });

  return User;
}
