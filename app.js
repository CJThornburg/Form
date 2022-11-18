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
      console.log(response)
    })
    .catch((err) => console.log(err));
    // const response = await axios.get(url);
    // console.log(response);
    
    res.render("landingpage.ejs")
    
})

app.listen(2000, function() {
    console.log("server has began")
  });
  