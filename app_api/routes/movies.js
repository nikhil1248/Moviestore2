var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});
const movieController = require('../controllers/movie');
const ctrlAuth = require('../controllers/authentication');
var ctrlReviews = require('../controllers/reviews');
//movies
router.get('/movies', movieController.getMovieName);
router.post('/movies',movieController.createMovie);
router.get('/movies/:movieid', movieController.getSingleMovie);
router.put('/movies/:movieid',movieController.updateMovie);
router.delete('/movies/:movieid',movieController.deleteMovie);
router.post('/movies/register', ctrlAuth.register);
router.post('/movies/login', ctrlAuth.login);

// reviews
router.post('/movies/:movieid/reviews',auth,ctrlReviews.reviewsCreate);

module.exports = router;

