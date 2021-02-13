const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const createError = require('http-errors');

const {OAuth2Client} = require('google-auth-library');

class UserController {
  static postRegister(req, res, next) {
    let { email, password, firstName, lastName } = req.body;
    User.create({ email, password, firstName, lastName })
      .then((user) => {
        res.status(201).json({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profPic: user.profPic
        });
      })
      .catch((err) => {
        next(err)
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;
    console.log(req.body, 'ini isi req body aneh sekali')
    User.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        console.log(user)
        if (!user)
          throw createError(400, 'Invalid email or password');
        const comparedPassword = comparePass(password, user.password);
        if (!comparedPassword) 
          throw createError(400, 'Invalid email or password');

        let dataUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profPic: user.profPic
        }
        const access_token = generateToken(dataUser);
        res.status(200).json({
          access_token,
          dataUser
        });
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let id;
    let email;
    let firstName;
    let lastName;
    let profPic;
    client
    .verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      console.log(payload);
      id = payload.id;
      email = payload.email;
      firstName = payload.given_name;
      lastName = payload.family_name;
      profPic = payload.picture;

      return User.findOne({ where: { email }})
    })
    .then(user => {
      console.log(user)
      if(user) {
        //generate token
        let token = generateToken({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profPic: user.profPic
        })
        res.status(200).json({
          access_token: token,
          dataUser: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            profPic: user.profPic
          }
        })
      } else {
        return User.create({
          email,
          password: process.env.USER_PWD_GOOGLE,
          firstName,
          lastName,
          profPic
        })
        .then(registeredUser => {
          let token = generateToken({
            id: registeredUser.id,
            email: registeredUser.email,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            profPic: registeredUser.profPic
          })
          res.status(201).json({
            access_token: token,
            dataUser: {
              id: registeredUser.id,
              email: registeredUser.email,
              firstName: registeredUser.firstName,
              lastName: registeredUser.lastName,
              profPic: registeredUser.profPic
            }
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

}

module.exports = UserController;
