
const mysql=require('mysql');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'tuition'
})

db.connect((err)=>{
    if(err){
        console.error("Error connecting to MySQL:",err.message);
        return;        
    }
    console.log("connected to MySQL Successfully!");
    
});

module.exports=db;