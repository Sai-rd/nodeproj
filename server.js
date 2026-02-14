const {Client}= require("pg")
require("dotenv").config()
const express=require("express")
const app=express()
app.use(express.json())

const con = new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
})
con.connect().then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log("error connecting to database",err)
})

app.post('/postdata',(req,res)=>{
    const {name,id}=req.body
    const query = "INSERT INTO demotable(name,id) VALUES($1,$2)"
    con.query(query,[name,id],(err,result)=>{
        if(err){-
            console.log("error inserting data",err)}
        else{
            res.send("data inserted successfully")
        }
    })
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

app.get('/getdata',(req,res)=>{
    const query = "SELECT * FROM demotable"
    con.query(query,(err,result)=>{
        if(err){
            console.log("error fetching data",err) }
        else{
            res.json(result.rows)
        }
    })
})  

app.get('/getdata/:id',(req,res)=>{
    const id=req.params.id
    const query = "SELECT * FROM demotable WHERE id=$1" 
    con.query(query,[id],(err,result)=>{
        if(err){
            console.log("error fetching data",err) } 
        else{
            res.json(result.rows)
        }       
    })
})

app.put('/updatedata/:id',(req,res)=>{
    const id=req.params.id
    const {name}=req.body
    const query = "UPDATE demotable SET name=$1 WHERE id=$2"
    con.query(query,[name,id],(err,result)=>{
        if(err){ 
            console.log("error updating data",err) }
        else{
            res.send("data updated successfully")
        } 
    })
}) 

app.delete('/deletedata/:id',(req,res)=>{
    const id=req.params.id
    const query = "DELETE FROM demotable WHERE id=$1"   
    con.query(query,[id],(err,result)=>{
        if(err){ 
            console.log("error deleting data",err) }    
        else{
            res.send("data deleted successfully")
        }   
    })
})  
