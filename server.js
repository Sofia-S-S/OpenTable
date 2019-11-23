// Dependencies
// ===========================================================
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
// Data
// ===============================================
//3 Make fake data //13 empty 3 and 5
const rsvp = [];
/* {
    customerName: "Eric",
    customerEmail: "eric@glab.com",
    customerId: "334",
    phoneNumber: "324-555-5454"
  },
  {
    customerName: "Kevin",
    customerEmail: "kevin@glab.com",
    customerId: "664",
    phoneNumber: "324-666-6666"
  }
];
//5//*/
const waitlist = [];
/* {
    customerName: "Tony",
    customerEmail: "tony@glab.com",
    customerId: "777",
    phoneNumber: "324-555-777"
  },
  {
    customerName: "Rachel",
    customerEmail: "rachel@glab.com",
    customerId: "888",
    phoneNumber: "324-666-8888"
  }
];*/

// general route
app.get("/", (req, res) => {
  // 1 / /res.send("hi"); // =send text proverim http://localhost:3000 / i dobavim file, sozdadin html file v papke public -1
  res.sendFile(path.join(__dirname, "./public/index.html")); //sending file instead text - 2
});
//9// then make new html file name tables
app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

//10//tables.html

//11// Make form
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/form.html"));
});
// 4 //get all the dataz // go to browser add to check/ http://localhost:3000/api/rsvp
app.get("/api/rsvp", (req, res) => {
  return res.json(rsvp);
});
//6 // add route for waitlist//
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

//7 //// add an object to the data
app.post("/api/tables", (req, res) => {
  //12// Limited reverwation and start wait list
  if (rsvp.length < 5) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
  // waitlist.push(req.body); //getting row data from klient and formatin it for my data base
  // res.json(false); //mean that does not go to reservation but wait list
});
// 8// Open PostMan, add object then go to web pache and see result added
//13 // clean
app.get("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
