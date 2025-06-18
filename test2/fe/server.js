const express=require("express")
const app=express()
app.get("/signup",function(req,res){
    res.sendFile(__dirname+ "/views/login.html")
   
    
})
app.listen(3010,function(){
    console.log("listening on port 3010") 
})
//get testakbl w traja3 w post testakbl w ta3ml traitement(formulaire nhkou)
//hechtah bil chemin absolue hna res.sendFile(ici
//por lancer serveur node server.js
