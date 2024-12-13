
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const {  createPool } = require("mysql");
const doenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app=express();




//.......routing part start... 

//all routing codes are transformed to pages.js file
/*
app.get("/",(req,res) => {
    res.render("index");
});

app.get("/service",(req,res) => {
    //res.render("index");
    res.render("service");
});

app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/register",(req,res) => {
    res.render("register");
});

app.get("/LegalRegister",(req,res) => {
    res.render("LegalRegister");
});

app.get("/ClientRegister",(req,res) => {
    res.render("ClientRegister");
});

app.get("/search",(req,res) => {
    res.render("search");
});

app.get("/profile2",(req,res) => {
    res.render("profile2");
});
*/

//cookies....
app.use(cookieParser());
//console.log(__dirname);  
//checking path module
//making pubilc as common 
const location = path.join(__dirname , "./public");
app.use(express.static(location));
app.set("view engine" , "hbs");
app.use(express.urlencoded({ extended:false})); 

//making partial as common
const partialsPath =path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath)

app.use("/", require("./routes/pages"));
//its is for accessing the auth file
app.use("/auth", require("./routes/auth"));

//routing part end
//its just saying the port (future we use ip address)     
app.listen(5000 , () =>{
        console.log("Server is started @ 5000 (1)");
});



doenv.config({
    path :"./.env"
});



//Routing part end
//DB connectivity start..................
console.log("DB connection start...");

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10 // Default to 10 if not set

})

db.getConnection((err) => {
    if(err)
    {
     console.log(err);
    }
    else
    {
     console.log("Mysql connection success");
    }
 });

/* its  is for Clearing the confusions
db.query("select * from client" , (err , result , fields)=>{
    if(err)
    {
        return console.log(err);
    }

    return console.log(result)
   
    });

    let email = "g@gmail.com";
    db.query("SELECT EMAIL FROM client WHERE EMAIL = ?", [email], (error, result) => {
        if (error) {
            console.log(error);
            // Handle the error, if any
        }
        if (result.length > 0) {
            console.log(result ,"haven ");
            // If result.length > 0, it means the email exists in the database
            // Render a response indicating that the email is invalid
        }
        
    });
*/    
//DB connectivity end.........................
console.log("DB connection end...");