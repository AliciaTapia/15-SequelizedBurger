
var express = require("express");
var router = express.Router();
var db = require("../models");

//get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.burger.findAll({}).then(function(burgerData) {
    // dentro del ({}) puedes poner una condicion ... 
    res.render("index.handlebars", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  db.burger.create({

    burger_name: req.body.burger_name,
    devoured:"false"

  }).then(function(result){
    res.redirect('/burgers')
  });
});
    
// put route -> back to index
router.put("/burgers/:update", function(req, res) {
  db.burger.update({

    devoured:req.body.burger_id
  },{
    where:{
      id: req.params.update
    }

  }).then(function(result){
    res.redirect('/burgers')
  });
});
    

module.exports = router;
