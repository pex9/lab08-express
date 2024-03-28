/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');                                  // logging middleware
const { check, validationResult, } = require('express-validator'); // validation middleware

const filmDao = require('./dao-films'); // module for accessing the films table in the DB

/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());

/*** Utility Functions ***/

// This function is used to format express-validator errors as strings
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};


/*** Films APIs ***/

// 1. Retrieve the list of all the available films.
// GET /api/films
// This route returns the FilmLibrary. It handles also "filter=?" query parameter
app.get('/api/films', 
  (req, res) => {
    // get films that match optional filter in the query
    filmDao.listFilms(req.query.filter)
      // NOTE: "invalid dates" (i.e., missing dates) are set to null during JSON serialization
      .then(films => res.json(films))
      .catch((err) => res.status(500).json(err)); // always return a json and an error message
  }
);

// 2. Retrieve a film, given its “id”.
// GET /api/films/<id>
// Given a film id, this route returns the associated film from the library.
app.get('/api/films/:id',[ check('id').isInt({min: 1}) ], (req, res) => {
  filmDao.getFilm(req.params.id).then((film) =>
    res.json(film)
  ).catch((err) => res.status(500).end()); // always return a json and an error message
});

// 3. Create a new film, by providing all relevant information.
// POST /api/films
// This route adds a new film to film library.
app.post('/api/films',[
  check('title').isLength({min: 1, max:160}),
  check('favorite').isBoolean(),
  check('watchDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
  check('rating').isInt({min: 0, max: 5}),
],  (req, res) => {
  const film = {
    title: req.body.title,
    favorite: req.body.favorite,
    watchDate: req.body.watchDate, // A different method is required if also time is present. For instance: (req.body.watchDate || '').split('T')[0]
    rating: req.body.rating,
    user: 1  // alternatively you can use the user id in the request, but it is not safe
  };
  filmDao.createFilm(film).then(()=>{
    res.status(201).end()
  })
  .catch((err) => res.status(500).end()); // always return a json and an error message
});

// 4. Update an existing film, by providing all the relevant information
// PUT /api/films/<id>
// This route allows to modify a film, specifiying its id and the necessary data.
app.put('/api/films/:id',[ check('id').isInt({min: 1}) ], (req, res) => {
  const film = {
    title: req.body.title,
    favorite: req.body.favorite,
    watchDate: req.body.watchDate, // A different method is required if also time is present. For instance: (req.body.watchDate || '').split('T')[0]
    rating: req.body.rating,
    user: 1  // alternatively you can use the user id in the request, but it is not safe
  };
  filmDao.updateFilm(req.params.id,film).then((film) =>
    res.status(200).end()
  ).catch((err) => res.status(500).end()); // always return a json and an error message
});

// 5. Mark an existing film as favorite/unfavorite
// PUT /api/films/<id>/favorite 
// This route changes only the favorite value. It could also be a PATCH.
app.put('/api/films/:id/favorite',[ check('id').isInt({min: 1}),check('favorite').isBoolean(), ], async (req, res) => {
  const film= await filmDao.getFilm(req.params.id);
  film.favorite=req.body.favorite;
  filmDao.updateFilm(req.params.id,film).then((film) =>
    res.status(200).end()
  ).catch((err) => res.status(500).end()); // always return a json and an error message
});

// 6. Update the rating of a specific film
// PUT /api/films/<id>/rating 
// This route changes only the rating value. It could also be a PATCH.

app.put('/api/films/:id/rating',[ check('id').isInt({min: 1}),check('favorite').isBoolean(), ], async (req, res) => {
  const film= await filmDao.getFilm(req.params.id);
  film.rating=req.body.rating;
  filmDao.updateFilm(req.params.id,film).then((film) =>
    res.status(200).end()
  ).catch((err) => res.status(500).end()); // always return a json and an error message
});

// 7. Delete an existing film, given its “id”
// DELETE /api/films/<id>
// Given a film id, this route deletes the associated film from the library.
app.delete  ('/api/films/:id',[ check('id').isInt({min: 1}) ], (req, res) => {
  filmDao.deleteFilm(req.params.id).then(() =>
    res.status(200).end()
  ).catch((err) => res.status(500).end()); // always return a json and an error message
});



// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
