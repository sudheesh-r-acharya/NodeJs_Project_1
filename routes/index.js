var express = require('express');
var router = express.Router();
const User =require("../models/userModels");
const user = require('../models/userModels');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign-Up' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign-In' });
});

router.get('/profile', async function(req, res, next) {
  try {
    const users = await User.find();
    res.render('profile', { title: 'Profile', users });
  } catch (error) {
    console.log(error);
  }
  
});
router.get('/delete/:id', async function(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/profile")
  } catch (error) {
    console.log(error);
  }
});

// --------------------------------------update----------------------------------------------------

router.get('/update/:userId', async function(req, res, next) {
  
  var currentUser = await User.findOne( { _id: req.params.userId})
  
  res.render("update", {user : currentUser ,title:"update user"})
  
});
// router.post('/update/:userId', async function(req, res, next) {
  //   try {
    //    var currentUser =  await User.findByIdAndUpdate(
      //     {_id: req.params.userId},
      //     {
        //       username: req.body.username,
        //       email: req.body.email,
        //       password: req.body.password,
        //     }
        //     );
        //     res.redirect("/profile")
        //   } catch (error) {
          //     console.log(error);
          //   }
          
          // });
 router.post("/update/:id" , async function(req,res,next){
            try {
              await User.findByIdAndUpdate(req.params.id , req.body);
              res.redirect("/profile");
            } catch (error) {
              res.send(error);  



















            }
})

 router.get('/forgot', function(req, res, next) {
    res.render('forgot', { title: 'Forgot-Password' });
   });
          
          
router.post('/forgot', async function(req, res, next) {
 try {
    const user = await User.findOne({email: req.body.email});

    if(user === null){
      return res.send(`User not Found. <a href="/signin">Signin</a>`);
    }

    res.redirect("/change/" + user._id);
  } catch (error) {
    res.send(error);  
  }
});

router.get("/change/:id" , async function(req,res,next){
  res.render("change",{ title: "Change-Password", id: req.params.id,})
})
router.post('/change/:id', async function(req, res, next) {
  try {

    await User.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/signin");

  } catch (error) {

    res.send(error);  
  }
});

router.get("/reset/:id" , async function(req,res,next){
  res.render("reset",{ title: "Reset-Password", id: req.params.id,});
});

router.post('/reset/:id', async function(req, res, next) {
  try {
    const {oldpassword , password} = req.body;
    const user = await User.findById(req.params.id);

    if(oldpassword !== user.password){
      return res.send(`Incorrect Password. <a href="/reset/${user._id}">Reset</a>`);
    }
    await User.findByIdAndUpdate(req.params.id , req.body);
    res.redirect("/profile");

  } catch (error) {
    res.send(error);  
  }
});

// router.post('/signup', function(req, res, next) {
//   const newuser = new User(req.body);
//   newuser
//          .save()
//          .then(() => res.redirect("./signin"))
//          .catch((err) => res.send(err));
// });
router.post('/signup', async function(req, res, next) {
  try{
    const newuser = User(req.body);
    await newuser.save();
    res.redirect("/signin");
  }
  catch(error){
    res.send(error);
  }
});

router.post('/signin' ,async function(req,res,next) {
  try {
    const{ username, password } = req.body;
    const user = await User.findOne({ username });
    if(user === null)
    return res.send(`User not Found. <a href="/signin">Signin</a>`);
    
    if(user.password !== password){
      return res.send(`Incorrect Password. <a href="/signin">Signin</a>`);
    }

    // res.json(user);
    res.redirect("/profile");
    
  } catch (error) {
    res.send(error)
  }
});




module.exports = router;
