const passport = require("passport");
const bcrypt =require('bcrypt')
const user = require("../controller/user");
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
require('dotenv').config()
const SECRET = process.env.SECRET
module.exports = {
    local_join:new LocalStrategy({
        usernameField:'userid',
        passwordField:'userpw',
        passReqToCallback:true
    },(req,userId,userPW,done)=>{
        user.findUser({userId:userId})
            .then((value)=>{
                done({msg:'joined existing ID', state:false})
            })
            .catch((value)=>{
                user.addUser({
                    userid:userId,
                    userpw:bcrypt.hashSync(userPW,12),
                    name:req.body.name,
                    phone:req.body.phone
                })
                    .then((value)=>{
                        done({msg:'join succeed', state:true})
                    })
                    .catch((value)=>{
                        done({msg:'joined existing ID & DB ERR', state:false})
                    })
            })
    }),
    jwt_login:new JwtStrategy({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
    },(payload,done)=>{
        console.log(payload)
    })
}