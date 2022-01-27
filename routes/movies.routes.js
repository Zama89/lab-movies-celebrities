const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/celebrity.model");

// iteration 6 new movie

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => console.log("Error", error)); 
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ 
    title, genre, plot, cast 
  })
    .then(() => res.redirect("/movies"))
    .catch((error) => {
      console.log("Error", error);
      res.redirect("/movies/create");
    });
});

// iteration 7 all movies

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((error) => console.log(error));
});

// iteration 8 movie detail route

router.get("/movies/:id", (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => next(error));
});

// iteration 9 delete movie
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log(error));
});

// iteration 10 edit movie

router.get("/movies/:id/edit", (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
    .populate('cast', 'name occupation catchPhrase')
    .then((movieToEdit) => {
      res.render("movies/edit-movie", { movieToEdit });
    })
    .catch((error) => next(error));
});

router.post("/movies/:id/edit", (req, res, next) => {

  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect("/movies"))
    .catch((error) => console.log(error));
});


module.exports = router;