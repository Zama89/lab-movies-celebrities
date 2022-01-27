const router = require("express").Router();
const Celebrity = require("../models/celebrity.model");

//Iteration 3

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.post("/celebrities/create", (req, res, next) => {

  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => {
        console.log(error)
        res.redirect('/celebrities/create')
        });
});



//Iteration 4

router.get("/celebrities", (req, res, next) => {

  Celebrity.find()
    .then((returnedCelebrities) => {
      res.render("celebrities/celebrities", { returnedCelebrities });
    })
    .catch((error) => console.log(error));
});

module.exports = router;