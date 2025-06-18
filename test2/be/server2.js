const express=require("express")
const app=express()
app.post("/signup",function(req,res){
    console.log("le be") 
})
app.listen(3020,function(){
    console.log("listening on port 3020") 
})