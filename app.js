const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var first = req.body.fname;
  var last = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/b8a7701be4",
    method: "POST",
    headers: {
      Authorization: "ryanc 4861ab77bd575b23ad5c71b424a3e048-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
  });
});

app.listen(3000, function() {
  console.log("Ready to monkey around!");
});
//api key
// 4861ab77bd575b23ad5c71b424a3e048-us4
//list id
//b8a7701be4
