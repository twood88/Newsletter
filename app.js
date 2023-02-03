const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")

});

mailchimp.setConfig({

  apiKey: "1f75f2b8982a1a7efa577ab8a057fe14-us21",
  server: "us21"
});

app.post("/", function(req, res) {
  const firstNameInput = req.body.firstName;
  const lastNameInput = req.body.lastName;
  const emailInput = req.body.email;
  const listId = "21ebae4760";
  const subscribingUser = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput
  };

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  res.sendFile(__dirname + "/success.html");

  console.log(response.statusCode);
}

run().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req, res) {
  res.redirect("/")
})

//API Key
// 1f75f2b8982a1a7efa577ab8a057fe14-us21

//List id
// 21ebae4760
