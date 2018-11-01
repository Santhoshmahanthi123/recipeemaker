var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    PassportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost:/recipee", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended : true}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine","ejs");
//schema
var recipeeSchema = new mongoose.Schema(
  {
      name: String,
      image:String
  });
  var Recipee = mongoose.model("Recipee",recipeeSchema);
//routs
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/secret",function(req,res){
    res.render("login");
});


app.get("/campgrounds",function(req,res){
    Recipee.find({},function(err,allCampgrounds){
      if(err)
      {
          console.log(err);
      }
      else{
          res.render("campgrounds",{campgrounds:allCampgrounds});
      }
    });
    app.get("/campgrounds/landing",function(req,res){
        res.render("landing");
    });
 
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image : image};
    Recipee.create(newCampground,function(err,newRecipee){
     if(err){
         console.log(err);
     }
     else{
         res.redirect("/campgrounds");
     }
    });

}); 

app.get("/campgrounds/new",function(req,res){
res.render("new");
});
app.get("/login",function(req,res){
    res.render("login");
    });
app.get("/signup",function(req,res){
        res.render("signup");
});

app.listen(3000,function(){
    console.log("Recipies server started on port: 3000");
});