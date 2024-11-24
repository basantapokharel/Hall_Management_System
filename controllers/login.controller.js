//users model
const listingModel = require("../models/users.model")

//index route
exports.index =async (req, res) =>{
    try {
        res.render("login"); // Renders views/login.ejs
      } catch (err) {
        res.status(500).send("Error rendering login page");
      }
}


//home route

exports.home =async (req, res) => {
    try{
        let {email,password}=req.body;
        let user=await listingModel.findOne({email:email,password:password});

        if(user){
            if(user.role=="admin"){
                return res.render("admin_dashboard");
            }else{
                return res.render("user_dashboard");
            }
        }else{
            // User not found
            return res.render("login", { message: "User not found"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Error logging in");
    }



}
