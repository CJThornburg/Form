const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
const ejs = require("ejs");
const { response } = require('express');
const app = express();
const bcrypt = require('bcryptjs');

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));




app.get('/', function (req, res)  {

    const url = "https://frontend-take-home.fetchrewards.com/form"

    axios
    .get(url)
    .then((response) => {
      const occupations = response.data.occupations;
      const states = response.data.states;
      res.render("landingpage.ejs", {
        occupations: occupations,
        states: states
      })
     
    })
    .catch((err) => 
    // add error page
    res.render("error.ejs", {
        error: "uh oh looks like the site is down, please try again later!"
    })
    );
      
    
})


app.post("/", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const occupation = req.body.occupation;
    const state = req.body.state;
    const stateTrimmed = state.slice(0, -5);
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
  

    const user = {
    name: name,
    email: email,
    password: hash,
    occupation: occupation,
    state: stateTrimmed
    }

    const url = "https://frontend-take-home.fetchrewards.com/form"
    axios.post(url, {
            name: name,
            email: email,
            password: password,
            occupation: occupation,
            state: stateTrimmed
            })
            .then((response) => {
                
                
                res.render("success.ejs", {
                    name: response.data.name,
                  })

              }, (error) => {
                res.render("error.ejs", {
                    error: "Uh oh looks like we can't reach our servers, try again later!"
                  });
              });
  
   
})


app.listen(2000, function() {
    console.log("server has began")
  });
  