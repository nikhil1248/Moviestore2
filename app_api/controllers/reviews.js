var mongoose = require('mongoose');
const Movie = mongoose.model('movie');
const User = mongoose.model('User');
const getAuthor = (req, res, callback) => {
    console.log("In get Author",req.payload);

    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                console.log("user name in get Author",user);
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
};

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//create a new review
module.exports.reviewsCreate = (req, res) => {
    console.log("hii");
        getAuthor(req,res,(req, res, userName) => {
            console.log(req.params);
            if (req.params.movieid) {
                Movie
                    .findById(req.params.movieid)
                    .select('reviews')
                    .exec(
                        function (err, movie) {
                            if (err) {
                                sendJSONresponse(res, 400, err);
                                console.log(err);
                            } else {
                                doAddReview(req, res, movie, userName);
                            }
                        }
                    );
                   
            } else {
                sendJSONresponse(res, 404, {
                    "message": "Not found, movieid required"
                });
            };
        })

        };
      
        



var doAddReview = function (req, res, movie,author) {
    if (!movie) {
        sendJSONresponse(res, 404, "movieid not found");
    } else {
        movie.reviews.push({
            author:author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        movie.save(function (err, movie) {
            var thisReview;
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                updateAverageRating(movie._id);
                thisReview = movie.reviews[movie.reviews.length - 1];
                sendJSONresponse(res, 201, thisReview);
            }
        });
    }
};

var updateAverageRating = function (movieid) {
    console.log("Update rating average for", movieid);
    Movie
        .findById(movieid)
        .select('reviews')
        .exec(
            function (err, movie) {
                if (!err) {
                    doSetAverageRating(movie);
                }
            });
};

var doSetAverageRating = function (movie) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (movie.reviews && movie.reviews.length > 0) {
        reviewCount = movie.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + movie.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        movie.rating = ratingAverage;
        movie.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Average rating updated to", ratingAverage);
            }
        });
    }
};
