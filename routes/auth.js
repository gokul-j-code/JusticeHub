//its is used for routing the forms ,logics bluit in DB

const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

router.post("/registerC",userController.registerC); //goto userController and visit the client register function 


router.post("/registerL",userController.registerL); //goto userController and visit the Legal register function 


router.post("/login",userController.login); 


router.post("/bothlogin",userController.bothloginC);

router.post("/bothloginA",userController.bothloginA);

router.get("/search", userController.search);

module.exports = router;