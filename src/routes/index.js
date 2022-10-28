
const route = require("express").Router()
const test = require('./test/user')

/**
 * @MethodTest
 * 
 */
route.use('/test/user',test)
module.exports = route