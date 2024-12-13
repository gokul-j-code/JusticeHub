const {
    createPool
} = require("mysql");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const { promisify } = require("util");
const { decode } = require("punycode");

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT || 10 // Default to 10 if not set

});



//\(* - *)/ ~ Client register function  start...................


exports.registerC=(req, res) => 
{

    const {name ,email, password , confirm_password } = req.body;

    db.query("SELECT EMAIL FROM client WHERE EMAIL = ?", [email], (error, result) => {
        if (error) {
            console.log(error);
            // Handle the error, if any
        }
        if (result.length > 0) {
            console.log(result);
            return res.render("ClientRegister", { msg: "Email is invalid" ,msg_type: "error"});
            // If result.length > 0, it means the email exists in the database
            // Render a response indicating that the email is invalid
        }
  
        //run successfully
        else if (password !== confirm_password) {
            return res.render("ClientRegister", {msg: "Password do not match" , msg_type: "error"});
        }   


        //entering data to database 
        db.query("insert into client set ?" ,{ name : name, email: email , pass : password} ,(error , reult) =>
        {
            if(error)
            {
            console.log(error);
            }
            else
            {
                console.log(result);
                return res.render("ClientRegister",{ msg : "Registration success " , msg_type: "good"});
            }

        });
  
  
});  

};


//\(*  *)/ ~ Client register function  start...................

/*************************/

//\(* - *)/ ~ Legal service provider register function  start...................

exports.registerL=(req, res) => 
{
    console.log("submited in LR")
    console.log(req.body);
    //res.send("okkkkk");
    const {
        full_name,
        gender,
        dob,
        email,
        phone,
        nationality,
        languages,
        bar_association,
        bar_license,
        areas_of_practice,
        years_of_experience,
        education,
        professional_affiliations,
        firm_name,
        firm_address,
        firm_website,
        firm_phone,
        billing_rates,
        payment_methods,
        billing_address
      } = req.body;
    
      const sql = `
        INSERT INTO lawyers (
          full_name,
          gender,
          dob,
          email,
          phone,
          nationality,
          languages,
          bar_association,
          bar_license,
          areas_of_practice,
          years_of_experience,
          education,
          professional_affiliations,
          firm_name,
          firm_address,
          firm_website,
          firm_phone,
          billing_rates,
          payment_methods,
          billing_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        full_name,
        gender,
        dob,
        email,
        phone,
        nationality,
        languages,
        bar_association,
        bar_license,
        areas_of_practice,
        years_of_experience,
        education,
        professional_affiliations,
        firm_name,
        firm_address,
        firm_website,
        firm_phone,
        billing_rates,
        payment_methods,
        billing_address
      ];
    
      db.query(sql, values, (err, result) => {
        if (err) {
          return res.render("LegalRegister", {msg: "An error occurred while registering the lawyer" , msg_type: "error"});
        } else {
          return res.render("LegalRegister", { msg: 'Lawyer registered successfully' , msg_type: "good"});
        }
      });


};






/*******************************/

//111111111111111111111-------------------------old--------------------------
//\(* *)/ ~ login function 
exports.login= async (req, res) =>{
    //console.log("forms submitted");
    try{
        const { email , password } =req.body;

        if(!email || !password )
        {
            return res.status(400).render("login",{ msg: "Please enter email & passord" ,msg_type: "error"});
        }

        //now check user mail & password from DB and ensure it
        db.query("select * from client where email = ?" ,[email], async (error , result) =>{
            console.log(result);
            if(result.length <=0)
            {
                return res.status(401).render("login", {msg: "Please Enter Your Email and Password" , msg_type: "error"});
            }

            else
            {
                console.log(result[0].PASS,"-----asdfghj");
                if(!(password ==result[0].PASS))
                {
                    return res.status(401).render("login", {msg: "Please Enter correct Password" , msg_type: "error"});

                }
                else
                {
                    console.log("goooooood")//res.send("good");
                    /*------------------------*/



                    //coke's & token purpose
                    //token....
                    const id= result[0].ID;
                    const token = jwt.sign({id : id} , process.env.JWT_SECRET ,{
                        expiresIn : process.env.JWT_EXPIRES_IN,
                    });
                    console.log("token is ....", token);
                   
                    //coke's....
                    const cookieOptions = {
                        expires : new Date (
                            Date.now() + process.env.JWT_COOKIE_EXPIRES *26*60 * 60 *1000

                        ),
                        httponly : true,
                    };

                    //store the cokies
                    res.cookie("keyname" , token , cookieOptions);
                    res.status(200).redirect("/");
                
                }
                


            }

        });

    }
    catch(error){
        console.log(error);

    }

};


//\(* *)/ ~ Client login function start
exports.bothloginC= async (req, res) =>{
    //console.log("forms submitted");
    try{
        const { email , password } =req.body;

        if(!email || !password )
        {
            return res.status(400).render("bothlogin",{ msg: "Please enter email & passord " ,msg_type: "error"});
        }

        //now check user mail & password from DB and ensure it
        db.query("select * from client where email = ?" ,[email], async (error , result) =>{
            console.log(result);
            if(result.length <=0)
            {
                return res.status(401).render("bothlogin", {msg: "Please Enter Your Email and Password " , msg_type: "error"});
            }

            else
            {
                console.log(result[0].PASS,"-----asdfghj");
                if(!(password ==result[0].PASS))
                {
                    return res.status(401).render("bothlogin", {msg: "Please Enter correct Password " , msg_type: "error"});

                }
                else
                {
                    console.log("goooooood")//res.send("good");
                    /*------------------------*/

                    //coke's & token purpose
                    //token....
                    const id= result[0].ID;
                    const token = jwt.sign({id : id} , process.env.JWT_SECRET ,{
                        expiresIn : process.env.JWT_EXPIRES_IN,
                    });
                    console.log("client token is ....", token);
                   
                    //coke's....
                    const cookieOptions = {
                        expires : new Date (
                            Date.now() + process.env.JWT_COOKIE_EXPIRES *26*60 * 60 *1000

                        ),
                        httponly : true,
                    };

                    //store the cokies
                    res.cookie("keyname" , token , cookieOptions);
                    res.status(200).redirect("/");
                
                }
                


            }

        });

    }
    catch(error){
        console.log(error);

    }

};

//\(* *)/ ~ login function end




//\(* *)/ ~advogates login function  start

exports.bothloginA= async (req, res) =>{
    //console.log("forms submitted");
    try{
        const { email , password } =req.body;

        if(!email || !password )
        {
            return res.status(400).render("bothlogin",{ msg: "Please enter email & passord ('')" ,msg_type: "error"});
        }

        //now check user mail & password from DB and ensure it
        db.query("select * from lawyers where email = ?" ,[email], async (error , result) =>{
            console.log(result);
            if(result.length <=0)
            {
                return res.status(401).render("bothlogin", {msg: "Please Enter Your Email and Password (' ')" , msg_type: "error"});
            }

            else
            {
                console.log(result[0].PASS,"-----asdfghj");
                if(!(password ==result[0].PASS))
                {
                    return res.status(401).render("bothlogin", {msg: "Please Enter correct Password (- -)" , msg_type: "error"});

                }
                else
                {
                    console.log("goooooood")//res.send("good");
                    /*------------------------*/

                    //coke's & token purpose
                    //token....
                    const id= result[0].ID;
                    const token = jwt.sign({id : id} , process.env.JWT_SECRET ,{
                        expiresIn : process.env.JWT_EXPIRES_IN,
                    });
                    console.log("token is ....", token);
                   
                    //coke's....
                    const cookieOptions = {
                        expires : new Date (
                            Date.now() + process.env.JWT_COOKIE_EXPIRES *26*60 * 60 *1000

                        ),
                        httponly : true,
                    };

                    //store the cokies
                    res.cookie("keyname" , token , cookieOptions);
                    res.status(200).redirect("/");
                
                }
            }
        });
    }
    catch(error){
        console.log(error);

    }
};

//\(* *)/ ~advogates login function  end



/*******************************/

//\(* *)/ ~searching  function  start

exports.search = (req, res) => {

    console.log("now searching function is runnign");
    // Get the search query from the request
    const query = req.query.query;
    
    // If there's no query, render the search view
    if (!query) {
        return res.render('search');
    }

    // SQL query to search for lawyers based on the query parameter
    const sql = `SELECT * FROM lawyers WHERE full_name LIKE ? OR phone LIKE ?`;
    const values = [`%${query}%`, `%${query}%`];

    // Query the database
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }

        // Render the search view, passing the search results and the query
        console.log(results)
        res.render('search', { lawyers: results, query });
    });

};
//\(* *)/ ~searching  function  end 


/*******************************/

//isLoging client function start 

exports.isLoggedIn = async (req , res , next) => {
    //req.name = "checking login....";
    //console.log(req.cookies)
    if(req.cookies.keyname)
    {
        try{
        const decode =await promisify(jwt.verify) //its will ceck this below 2 function and give values to us 
        (
            req.cookies.keyname,
            process.env.JWT_SECRET
        );
        console.log(decode); //after getting data of respected token id 
        
        db.query("select * from client where id= ?" ,[decode.id], (err , results) =>
        {
            //console.log(result);

            if(!results)
            {
                return next();
            }
            req.user = results[0];
            return next();
        });


        }
        catch(error)
        {
            console.log(error);
            return next();
        }
    }
    else 
    {
        next();
    }

}

//isLoging  function end 

/*******************************/

//isLogingAsAdvocate start

exports.isLoggedInAsAdvocate = async (req , res , next) => {
        //req.name = "checking login....";
        //console.log(req.cookies)
        if(req.cookies.keyname)
        {
            try{
            const decode =await promisify(jwt.verify) //its will ceck this below 2 function and give values to us 
            (
                req.cookies.keyname,
                process.env.JWT_SECRET
            );
            console.log(decode); //after getting data of respected token id 
            
            db.query("select * from lawyers where id= ?" ,[decode.id], (err , results) =>
            {
                //console.log(result);
    
                if(!results)
                {
                    return next();
                }
                req.user = results[0];
                return next();
            });
    
    
            }
            catch(error)
            {
                console.log(error);
                return next();
            }
        }
        else 
        {
            next();
        }
    
};    


    

//isLoginAsAdvocate end 

