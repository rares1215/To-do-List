const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const app = express();
const ejs = require("ejs");
const { getDay, getDate } = require("./date");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
let items = ["Wake up", "Eat", "Drink Coffee"];
let workItems = [];
app.get("/", function(req, res){
   let day = getDate();
   res.render("list.ejs", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
   let item = req.body.newItem;
   if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
   } else {
   items.push(item);
    res.redirect("/");
   }
})

app.get("/work", function(req, res){
    res.render("list.ejs", {listTitle: "Work list", newListItems: workItems})
});

app.post("/work", function(){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res ){
    res.render("about")
})



app.listen(3000, function(){
    console.log("Server running on port 3000.");
})