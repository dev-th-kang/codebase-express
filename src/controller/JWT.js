const jwt = require('jsonwebtoken')
const db = require('../config/db')
const { INSERT, REPLACE } = require('../model/sql-escape')
const { findUser } = require('./user')
require('dotenv').config()

const SECRET = process.env.SECRET
const TYPE = process.env.TYPE
const TOKEN_TABLE = process.env.TOKEN_TABLE
module.exports = {
    issue:(userData,expir)=>{
        const payload = {userid:userData.userid,
                        name:userData.username}
        
        const token = TYPE+" "+jwt.sign(payload,SECRET,{expiresIn:expir})
        return token
    },
    authenticate:()=>{

    },
    saveRefreshToken:(payload)=>new Promise((resolve, reject) => {
        db.query(REPLACE(TOKEN_TABLE,payload),(err,results)=>{
            
            if(err) reject({msg:err.message, state:'error'})
            if(results.affectedRows)
                resolve({msg:results.message, state:'success'})
            else
                reject({msg:results.message, state:'fail'})
        })
    })
}

/*
create table tokenlist(
    userid varchar(50),
    token varchar(300),
    primary key(userid)
)
*/