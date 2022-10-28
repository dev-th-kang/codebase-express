const route = require("express").Router()
const passport = require("passport")
const bcrypt = require('bcrypt')
const { issue, saveRefreshToken } = require("../../controller/JWT")
const user = require("../../controller/user")
const { CODE } = require("../../lib/httpCode")
route
    .post('/join',(req,res,next)=>{
        passport.authenticate('local-join',(results)=>{
                res.send(results)
        })(req,res,next)
    })
    .post('/login',(req,res)=>{
        //access Token
        const {userid,userpw} = req.body;
        user.findUser({userid:userid})            
            .then((value)=>{
                bcrypt.compare(userpw,value.content[0].userpw,(err,isvalid)=>{
                    if(isvalid){
                        // 로그인 완료
                        const accessToken = issue(value.content[0], '30s')
                        const refreshToken = issue(value.content[0], '1h')
                        saveRefreshToken({userid:userid,'token':refreshToken})
                            .then(()=>{
                                res.send({msg:"login succeed",token:accessToken})
                            })
                            .catch(()=>{
                                res.send({msg:"db err"})
                            })
                    }
                    else{
                        res.send({msg:"PW 일치 x"})
                    }
                })
            })
            .catch((value)=>{
                res.send({msg:"id 일치 x"})
            }) 
        // issue(req.body,'30s')
        // issue(req.body,'2h')
    })
    .post('/auth',(req,res,next)=>{
        passport.authenticate('jwt-login',{session:false},(results)=>{
            console.log("a")
        })(req,res,next)
    })
    .get('/',(req,res)=>{
        user.findUser()            
            .then((value)=>{
                res.status(CODE.SUCCESS).send(value)
            })
            .catch((value)=>{
                res.status(CODE.UNAUTHORIZED).send(value)
            })        
    })
    .get('/:userId',(req,res)=>{
        const userId = req.params
        user.findUser(userId)
            .then((value)=>{
                res.status(CODE.SUCCESS).send(value)
            })
            .catch((value)=>{
                res.status(CODE.UNAUTHORIZED).send(value)
            })
        
    })
    .post('/',(req,res)=>{
        const userData = req.body
        user.addUser(userData)
            .then((value)=>{
                res.status(CODE.SUCCESS).send(value)
            })
            .catch((value)=>{
                res.status(CODE.UNAUTHORIZED).send(value)
            })

    })
    .put('/',(req,res)=>{
        const userId = {userid:req.body.userid}
        delete req.body["userid"]
        const userData = req.body
        user.updateUser(userId,userData)
            .then((value)=>{
                res.status(CODE.SUCCESS).send(value)
            })
            .catch((value)=>{
                res.status(CODE.UNAUTHORIZED).send(value)
            })
    })
    .delete('/:userId',(req,res)=>{
        const userId = req.params
        user.delUser(userId)
            .then((value)=>{
                res.send(value)
            })
            .catch((value)=>{
                res.send(value)
            })
    })

module.exports = route