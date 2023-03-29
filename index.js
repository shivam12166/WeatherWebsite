const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(require, respond) {
    respond.sendFile(__dirname + "/index.html");
})
app.post("/", function(require, respond) {

    const query = require.body.CityName;
    const apiKey = "dc0f589d3d258ef2b68d0b53cb0ebfda"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
    https.get(url, function(res) {
        console.log(res.statusCode);
        res.on("data", function(data) {
            const WeatherData = JSON.parse(data);
            // console.log(WeatherData);
            const temp = WeatherData.main.temp;
            const WeatherDescription = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageURL = " https://openweathermap.org/img/wn/" + icon + "@2x.png"
            respond.write("<h1>The temperature in " + query + " is " + temp + " degree Celcius.</h1>");
            respond.write("<p>The Weather Description is " + WeatherDescription + " in " + query + "");
            respond.write("<img src= " + imageURL + ">");
            respond.send();
        })
    })
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");
})