'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsToMany(models.User, {through: models.UserOrganization});
      Organization.hasMany(models.Task)
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'organization name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'organization name cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};