const con = require("./connection");
const express = require ("express");
const app = express();
const bodyParser = require('body-parser');

// const encoder = bodyParser.urlencoded();
app.use("/assets",express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.get('/',function(req,res) {
    res.sendFile(__dirname+'/public/signup.html');
 });
app.get('/login',function(req,res) {
  res.sendFile(__dirname+'/public/login.html');
});
app.get('/home',function(req,res) {
  res.sendFile(__dirname+'/public/home.html');
});
app.get('/breeder',function(req,res) {
  res.sendFile(__dirname+'/public/breeder.html');
});
app.get('/dealer',function(req,res) {
  res.sendFile(__dirname+'/public/dealer.html');
});
app.get('/species',function(req,res) {
  res.sendFile(__dirname+'/public/species.html');
});
app.get('/pond',function(req,res) {
  res.sendFile(__dirname+'/public/pond.html');
});
app.get('/contact',function(req,res) {
  res.sendFile(__dirname+'/public/contact.html');
});

app.post('/',function(req,res){
    var license_no = req.body.License;
    var Name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;

    var sql = "INSERT INTO info_db(license_no,name,email,password,designation) VALUES('"+license_no+"','"+Name+"','"+email+"','"+password+"','"+role+"')";
  con.query(sql,function(error){
    if(error) throw error;
    res.redirect('../login');
  })
});


 app.post("/login",function(req,res){
   var Email =req.body.email;
   var Password=req.body.password;
   console.log(Email,Password)
   con.query("SELECT * FROM `info_db` WHERE `email` = ? AND `password` = ?" ,[Email,Password],function(error,results,fields){
     console.log(results.length)
    if(results.length > 0){
       res.redirect('../home');
     }
     else
     {
       res.redirect('../login');
     }
     res.end();
   });
 });

 app.post('/home',function(req,res){
  var O_email = req.body.O_email;
  var O_name = req.body.O_name;
  var O_phone = req.body.O_phone;
  var O_address = req.body.O_address;
  var S_id = req.body.S_id;
  var P_id = req.body.P_id;
  console.log(O_email,O_name,O_phone,O_address,S_id,P_id)
  var mpb = "INSERT INTO owner(O_email,O_name,O_phone,O_address,S_id,P_id) VALUES('"+O_email+"','"+O_name+"','"+O_phone+"','"+O_address+"','"+S_id+"','"+P_id+"')";
con.query(mpb,function(error){
  if(error) throw error;
  res.redirect('../home');
})
});
    
app.listen(7000);