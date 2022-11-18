const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
const ejs = require("ejs");
const app = express();

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
      console.log(response.data.occupations[0]);
      const occupations = response.data.occupations;
      const states = response.data.states;
      console.log(states)
      res.render("landingpage.ejs", {
        occupations: occupations,
        states: states
      })
     
    })
    .catch((err) => 
    // add error page
    res.render("uhoh.ejs")
    );
    


    
   
    
})

app.listen(2000, function() {
    console.log("server has began")
  });
  