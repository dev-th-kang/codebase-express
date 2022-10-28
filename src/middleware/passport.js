const passport = require("passport");
const { local_join, jwt_login } = require("../lib/strategy");
passport.use('local-join',local_join)
passport.use('jwt-login',jwt_login)