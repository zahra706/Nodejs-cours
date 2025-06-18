//1-les biblio   (importer package express    heka   const express=require("express") hadi bibliotheque michi lwra const hadaka esm var)         un seul fichier d'entré server.js
//2-la configation   bdd mysql 
/*3-les routes   const app=express()    app.get(a,b) 
 a wen mashi  b wchbich ysir fonction anonyme feha req w res (nraj3ou lil utilisateur ) 
    app.get("/contact",function(req,res){
    res.send("<b>binvenue</b>")

-cd ts
-
-
-})
app.listen(3001)    
//4-l'execution    kol mohtwa fichier nodejs   node server.js   commande execution
// let local var global      npm init --yes  npm i -yes      npm i express serveur local     w na3mlou server.js fi proj
//    node server.js   commande execution*/
const express=require("express")
const app=express() 
app.get("/contact",function(req,res){
    res.send("<b>binvenue</b>")
})
//app.listen(3001)  hadi yekdm w maykrj chay fi cmd


app.listen(3001,function(){
    console.log("listening on port 3001") //kinektebha ykarjha fi cmd win nektb comands
})