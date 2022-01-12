const express = require("express");
const bodyParser = require ("body-parser");
var player = require ("play-sound");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/userNames.html");

});

app.post("/", function(req, res){
  res.sendFile(__dirname + "/main.html");
  const soundName = req.body.cardName;
  console.log(soundName);
});




app.listen(process.env.PORT || 3000, function(){
  console.log("Server Is Running On Port 3000!");
});
