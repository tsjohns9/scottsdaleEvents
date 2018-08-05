const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../controllers/userController');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('bearer');
  opts.secretOrKey = 'secretkey';
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log(jwt_payload);
      User.getUserById(jwt_payload.result.id)
        .then(res => {
          const userObj = {
            id: res[0].id,
            email: res[0].email,
            activeCart: res[0].Carts[0].id
          };
          return done(null, userObj);
        })
        .catch(err => {
          console.log('err', err);
          return done(null, false);
        });
    })
  );
};