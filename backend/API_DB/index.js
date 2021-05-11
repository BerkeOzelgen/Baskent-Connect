const express=require("express");
const app=express();
const pool=require("./db");
//nodemon index.js
app.use(express.json()); // => req.body ** give access to you request body

//Routes//

//get all users//
app.get("/user",async (req,res)=>{
    try{
        const allUsers= await pool.query("SELECT * FROM login");
        res.json(allUsers.rows);
    }
    catch{
        console.error(err.message);
    }
})
//get a user//
app.get("/user/:username",async (req,res)=>{
    //console.log(req.params);
    const{username}=req.params;
    try{
        const getUser=await pool.query("SELECT * FROM login WHERE username=$1",[username]);
        res.json(getUser.rows);
    }
    catch (err){
        console.error(err);
    }
})
app.get("/system",async (req,res)=>{
    try{
        const allUsers= await pool.query("SELECT * FROM user_table");
        res.json(allUsers.rows);
    }
    catch{
        console.error(err.message);
    }
})
app.get("/system/:userid",async (req,res)=>{
    //console.log(req.params);
    const{userid}=req.params;
    try{
        const getUser=await pool.query("SELECT * FROM user_table WHERE userid=$1",[userid]);
        res.json(getUser.rows);
    }
    catch (err){
        console.error(err);
    }
})
app.get("/courses",async (req,res)=>{
    try{
        const allUsers= await pool.query("SELECT * FROM courses");
        res.json(allUsers.rows);
    }
    catch{
        console.error(err.message);
    }
})
app.get("/courses/:courseid",async (req,res)=>{
    //console.log(req.params);
    const{courseid}=req.params;
    try{
        const getUser=await pool.query("SELECT * FROM courses WHERE courseid=$1",[courseid]);
        res.json(getUser.rows);
    }
    catch (err){
        console.error(err);
    }
})
//create a user//
app.post("/user",async (req,res)=>{
    try{
        //await ** which waits for something to finish before it continues on
        //console.log(req.body);
        const {username,username_password}=req.body;
        const newUser=await pool.query("INSERT INTO login (username,username_password) VALUES ($1,$2) RETURNING *",[username,username_password]);
        res.json(newUser.rows);
    }
    catch(err){
        console.error(err.message);
    }
})

//update a user password //
app.put("/user/:username",async (req,res)=>{
    try{
        const{username}=req.params; //WHERE
        const{username_password}=req.body; //SET

        const updatePassword = await pool.query("UPDATE login SET username_password=$1 WHERE username=$2",[username_password,username]);
        res.json("Password is updated!");
    }
    catch (err){
        console.log(err);
    }
})
//delete a user//

app.delete("/user/:username", async (req,res)=>{
    try {
        const {username}=req.params;
        const deleteUser=await pool.query("DELETE FROM login WHERE username=$1",[username]);
        res.json("User was successfully deleted");
    }
    catch(err){
        console.error(err);
    }
})

//npm install nodemon ** it instantly restarts whenever you change something
app.listen(5000,()=>{
    console.log("server is listening on port 5000");
})
