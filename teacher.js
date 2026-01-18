const express = require("express");
const router = express.Router();

router.use(express.json());
const db = require("./db"); 

router.post('/addStudent',async(req,res)=>{

    const student=req.body;
    const {name,standard,gender,studentid,studentpassword,email,phone}=student;
    console.log(student);
      
   db.query("INSERT INTO student (name,standard,password,student_id,email,phno,gender) values (?,?,?,?,?,?,?)",[name,standard,studentpassword,studentid,email,phone,gender],(err,result)=>{
    db.query("INSERT INTO user (user_id,password,role) values (?,?,?)",[studentid,studentpassword,'student'],(err1,result1)=>{
        if(err){
            console.error("Error inserting data:", err);
            return res.status(500).json({message:"error when interting data into student"})
        }
        if(err1){
            console.error("Error inserting data into user:", err1);
            return res.status(500).json({message:"error when interting data into user"})
        }
        return res.status(200).json({message:"student is successfully added!",info:student});
    })
})

})



router.get('/getstudentlist',async(req,res)=>{

    db.query("SELECT * FROM student",(err,result)=>{
        if(err){
            return res.status(500).json({message:"error while geting student details"})
        }
        console.log(result);        
        return res.status(200).json({message:"student information fetched successfully!",info:result})
    })



})
router.get('/classes', async (req, res) => {
    db.query("SELECT * FROM subject ", (err, result) => {
        if (err) {
            console.log("Error fetching classes from teacher.js:", err);
            return res.status(500).json({ message: `Error fetching classes: ${err.message}` });
        }
        console.log("Classes fetched successfully:", result);
        return res.status(200).json(result);
    });
});







module.exports=router;