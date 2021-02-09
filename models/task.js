'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User);
      Task.belongsTo(models.Organization)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'title cannot be empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'title cannot be empty'
        }
      }
    },
    OrganizationId: DataTypes.INTEGER,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};