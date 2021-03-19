const mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {type: String, required: true},
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
var moviesSchema = new mongoose.Schema({
    movieName: {type: String, required: true, min:5},
    movieDirector: {type: String, required: true, min:5},
    movieYear: {
        type: String,
        min: 4,
        max: 4
    },
    movieRating: {
        type: String,
        required: true,
        min: 0,
        max: 5
    },
    movieType: {type: String, required: true, min:5},
    reviews: [reviewSchema]
});


mongoose.model('movie', moviesSchema, 'movies');
