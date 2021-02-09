'use strict';
const {hashPass} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Organization, {through: models.UserOrganization})
      User.hasMany(models.Task)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'last name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'last name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'This email has been used'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        },
        notNull: { // khusus untuk null
          msg: "password cannot be empty"
        },
        len: {
          args: [6,200],
          msg: 'minimum password length is 6 characters'
        }
      }
    },
    profPic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        let name = `${user.firstName}+${user.lastName}`;
        name.replace(/\s/g, '+');
        user.profPic = `https://ui-avatars.com/api/?background=random&name=${name}&rounded=true`;
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};