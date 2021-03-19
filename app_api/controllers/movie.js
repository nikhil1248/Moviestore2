const mongoose = require('mongoose');
const Movie = mongoose.model('movie');

const getMovieName = function (req, res){
  Movie.find().exec(function(err, moviedata){
	 if(err){
		 res
		 .status(404)
		 .json({err});
         
	 return;
	 }
	 res
		 .status(200)
		 .json(moviedata);
  })

};



const createMovie = function (req, res){
    console.log(req.body.movieName);
       
  Movie.create({
	 	movieName: req.body.movieName,
        movieDirector: req.body.movieDirector,
	  	movieYear: req.body.movieYear,
	    movieRating: req.body.movieRating,
	  	movieType: req.body.movieType
    }, (err, moviedata) => {
        if (err) {
			res
            .status(400)
			.json(err);
        } 
        else {
            res
			.status(201)
			.json(moviedata);
        } 
  });
};

const getSingleMovie = function (req, res){
  Movie
	  .findById(req.params.movieid)
        .exec((err, moviedata) => {
        if (!moviedata) {
            return res
                .status(404)
                .json({"message": "movie not found"});
        } 
        else if (err) {
            return res
                .status(404)
                .json(err);
        }
        res
            .status(200)
            .json(moviedata);
    });
};

const updateMovie = function (req, res){
  if (!req.params.movieid) {
        res
        .status(404)
        .json({
           "message" : "Not found, movie id is required"
        });
    return;
    }
    Movie.findById(req.params.movieid)
    .exec((err, moviedata) => {
       if (!moviedata) {
           res
        .json(404)
        .status({
              "message" : "movieid not found"});
        return;
       } else if(err){
           res
           .status(400)
           .json(err);
           return;
       }
        moviedata.movieName= req.body.movieName,
        moviedata.movieDirector= req.body.movieDirector,
	  	moviedata.movieYear= req.body.movieYear,
	    moviedata.movieRating= req.body.movieRating,
	  	moviedata.movieType= req.body.movieType
        moviedata.save((err, moviedata) => {
            if(err){
                res
                .status(404)
                .json(err);
            } else {
                res
                .status(200)
                .json(moviedata);
            }
        });
    }); 
};

const deleteMovie = function (req, res){
  const movieid = req.params.movieid;
  console.log("in delete api");
    
    if (movieid) {
        Movie
        .findByIdAndRemove (movieid)
        .exec((err, moviedata) => {
           if(err){
               res
               .status(404)
               .json(err);
            return;
           }
    res
		.status(204)
		.json(null);
        });
    } else {
        res
        .status(404)
        .json({"message" : "No movieid"});
}};

module.exports = {
    getMovieName,
    createMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
};