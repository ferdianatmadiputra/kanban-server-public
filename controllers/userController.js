const { User } = require("../models/index");
const { comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

const {OAuth2Client} = require('google-auth-library');

/**
 * PROSES REGISTER
 * 1. HTTP request dengan data req body email dan password
 * 2. hash password melalui hooks
 * 3. create user dijalankan dan data user tersimpan di database
 */

/**
 * PROSES LOGIN
 * 1. cek user ada apa nggak di database (berdasarkan email)
 * 2. kalau tidak ada, lempar error
 * 3. kalau ada, bandingkan password pakai bcrypt
 * 4. kalau password salah, lempar error
 * 5. kalau password sama, berarti user berhasil login dan return access_token (jwt)
 */

class UserController {
  static postRegister(req, res, next) {
    let { email, password, firstName, lastName } = req.body;
    console.log(req.body)
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
        console.log('...........sudah masuk error postregister controller..........')
        next(err)
      });
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email
      },
    })
      .then((user) => {
        if (!user)
          throw { 
            name: "customError",
            msg: "Invalid email or password",
            status: 400
          };
        const comparedPassword = comparePass(password, user.password);
        if (!comparedPassword) 
          throw {
            name: "customError",
            msg: "Invalid email or password",
            status: 400 
          };
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profPic: user.profPic
        });
        res.status(200).json({ access_token });
      })
      .catch((err) => {
        next(err);
      });
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
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
          email: user.email
        })
        res.status(200).json({access_token: token})
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
          res.status(201).json({access_token: token})
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

}

module.exports = UserController;
