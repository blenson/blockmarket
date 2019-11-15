const JwtStrategy = require("passport-jwt").Strategy;

const dotenv = require("dotenv");
dotenv.config();

var AuthModel = require("../models/Auth/AuthModel");

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.TOKEN_SECRET
};

module.exports = function(passport) {
    passport.use(
        new JwtStrategy(opts, async function(jwt_payload, done) {
            try {
                let auth = await AuthModel.findById(jwt_payload.id).exec();
                if (auth === null || jwt_payload.password !== auth.password) {
                    return done(null, false);
                }
                return done(null, auth);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
