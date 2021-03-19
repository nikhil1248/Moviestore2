var express = require('express');
var router = express.Router();
var moviesData = require('../controllers/moviename');
var about = require('../controllers/about');

/* GET home page. */
router.get('/', moviesData.homelist);
router.get('/movies/:movieid', moviesData.movieInfo);
router.route('/new').get(moviesData.addNewMovie).post(moviesData.doAddNewMovie);
router.get('/about', about.About);


module.exports = router;
