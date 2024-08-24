const express = require("express")
const db = require('./db/conn');
const app = express()
const port = 3000 


app.get('/user', (req, res)=>{
    res.send("")
})

app.listen(()=>{

    console.log(`server is running at ${port}`);
    
})