const db = require("../config/db")
const {INSERT,SELECT, DELETE, UPDATE} = require("../model/sql-escape")
require('dotenv').config()
const USER_TABLE = process.env.USER_TABLE

module.exports = {
    /** user 조회(json 기반 으로 값을 넘겨야함)
    */
    findUser:(userId =true)=>new Promise((resolve, reject) => {
        db.query(SELECT(USER_TABLE, userId),(err,rows)=>{
            //FIXME: here json msg
            if(err) reject({msg:err.message, state:'error'})
            if(rows.length)
                resolve({msg:"succeed find data", state:'success', content:rows})
            else
                reject({msg:"cannot find data", state:'fail', content:false})
        }) 
    }),
    /** user 추가(json 기반 으로 값을 넘겨야함) 
    */ 
    addUser:(userData)=>new Promise((resolve, reject) => {
        db.query(INSERT(USER_TABLE, userData),(err,results)=>{
            if(err) reject({msg:err.message, state:'error'})
            if(results.affectedRows)
                resolve({msg:results.message, state:'success'})
            else
                reject({msg:results.message, state:'fail'})
        })

    }),
    /** user 삭제(json 기반 으로 값을 넘겨야함)
    */
    delUser:(userId)=>new Promise((resolve, reject) => {
        db.query(DELETE(USER_TABLE, userId),(err,results)=>{
            if(err) reject({msg:err.message, state:'error'})
            if(results.affectedRows)
                resolve({msg:results.message, state:'success'})
            else
                reject({msg:results.message, state:'fail'})
        })
    }),
    /** user 갱신(json 기반 으로 값을 넘겨야함)
    */
    updateUser:(userId, userData)=>new Promise((resolve, reject) => {
        db.query(UPDATE(USER_TABLE, userData,userId),(err,results)=>{
            if(err) reject({msg:err.message, state:'error'})
            if(results.affectedRows)
                resolve({msg:results.message, state:'success'})
            else
                reject({msg:results.message, state:'fail'})
    
        })
    })
}

/**
 *  TODO: DB USERTABLE
 *  create table memberlist(
 *      userId varchar(20) NOT NULL,
 *      userpw varchar(20) NOT NULL,
 *      name varchar(20) NOT NULL, 
 *      phone varchar(20) NOT NULL,
 *      primary key(userId)
 *  )
 */