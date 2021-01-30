const express = require('express');
const app = express() ;
const bodyParser = require("body-parser") ;
const https = require("https");



app.use(bodyParser.urlencoded({extended:true})) ;
app.get("/", function(req,res){
  res.sendFile(__dirname+"/weather.html") ;

}) ;

app.post("/", function (req, res) {
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cd037305b2d9a40b4c02f7e2b76ef05f&units=metric" ;
  https.get(url, function(response){
      response.on("data", function(data){
        const weatherData = JSON.parse(data) ;
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description ;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
        
        res.write("<h1>The temperature in "+city+" is "+temp+"degrees Celcius</h1>") ;
        res.write("<p>The weather is "+ description + " in Tashkent.</p>") ;
        res.write("<img src="+ imageURL +">") ;
        res.send();
      })
  })
   ;
});


app.listen(3000, function () {
  console.log("It is running on port 3000!");
}) ;
