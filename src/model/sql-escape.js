const db = require("../config/db")

const SELECT = (TABLE_NAME, CASE)=>{
    return 'select * from '+TABLE_NAME 
            + ' where ' + db.escape(CASE)
}

const INSERT = (TABLE_NAME, DATA)=>{
    return 'insert into '+ TABLE_NAME
            +' ('+Object.keys(DATA)+')' 
            +' values('+db.escape(Object.values(DATA))+')'
}

const DELETE = (TABLE_NAME, CASE)=>{
    return 'delete from '+TABLE_NAME 
            + ' where ' + db.escape(CASE)
}

const UPDATE = (TABLE_NAME, DATA, CASE)=>{
    return 'update  '+TABLE_NAME 
            + ' set ' + db.escape(DATA)
            + ' where ' + db.escape(CASE)
}
const REPLACE = (TABLE_NAME,DATA)=>{
    return 'replace into '+TABLE_NAME
            + ' ('+ Object.keys(DATA) +')'
            + ' values('+db.escape(Object.values(DATA)) +')'
}
module.exports = {
    SELECT,INSERT,DELETE,UPDATE,REPLACE
}