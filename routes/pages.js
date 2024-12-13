const express = require("express");
const router = express.Router();
const userController = require("../controllers/users")   //for the middle ware

//inclue all app.router code in this place


router.get("/",(req,res) => {
    res.render("index");
});
/*
router.get("/", userController.isLoggedIn,(req,res) => {
    if(req.user)
    {
        res.render("index" , {user :req.user});
    }
    else{
        res.redirect("/bothlogin");
    }

});  */

router.get("/service",(req,res) => {

    res.render("service");
});

router.get("/login",(req,res) => { //mostly not used 
    res.render("login");
});

router.get("/register",(req,res) => {
    res.render("register");
});

router.get("/LegalRegister",(req,res) => {
    res.render("LegalRegister");
});

router.get("/ClientRegister",(req,res) => {
    res.render("ClientRegister");
});

router.get("/search",(req,res) => {
    res.render("search");
});


router.get("/bothlogin",(req,res) => {
    res.render("bothlogin");
});

/* 
router.get("/profile",(req,res) => {  //not used mostly
    res.render("profile");
});
*/
router.get("/profile",userController.isLoggedIn,(req,res) => {  
    if(req.user)
{
    res.render("profile" , {user :req.user});
}

else{
    res.redirect("/bothlogin");
}

});

/*
router.get("/profile2",(req,res) => {
    res.render("profile2");
});*/

router.get("/profile2",userController.isLoggedInAsAdvocate,(req,res) => {
    if(req.user)
{
    res.render("profile2" , {user :req.user});
}
else{
    res.redirect("/bothlogin");
}

});








router.get("/dashboard",userController.isLoggedInAsAdvocate,(req,res) => {  
    //res.render("dashboard");
    if(req.user)
    {
        res.render("dashboard" , {user :req.user});
    }
    else{
        res.redirect("/profile2");
    }
});


module.exports = router;