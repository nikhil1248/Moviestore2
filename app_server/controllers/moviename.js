const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};


const _renderHomePage = function(req, res, responseBody) {
    res.render('list-display', {
       movies: responseBody 
    });
};

const _renderCreatePage = function(req, res){
    res.render('create', {
       title: "Create New Movie"
    });
};

const addNewMovie = function(req, res){
    _renderCreatePage(req, res);
};

const doAddNewMovie = function(req, res){
    const path = '/api/movies';
    
    const postdata = {
      	movieName: req.body.movieName,
        movieDirector: req.body.movieDirector,
	  	movieYear: req.body.movieYear,
	    movieRating: req.body.movieRating,
	  	movieType: req.body.movieType
    };
    console.log(postdata);
    const requestOptions = {
        url: apiOptions.server+path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
		(err, response, body) => {
            if (response.statusCode === 201){
                res.redirect('/');
            }
            else{
                console.log(err);
            }
        }
    );
};

const homelist = function(req, res){
    const path = '/api/movies';
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json :{}
    };
    request(
    requestOptions,
        (err, response, body) => {
            _renderHomePage(req, res, body);
        }
    );
};

const _renderDetailPage = function (req, res, responseBody){
    res.render('details', {
        currentMovie: responseBody
    });
};

const movieInfo = function(req, res){
    const path = `/api/movies/${req.params.movieid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
    requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};


module.exports = {
    movieInfo,
	homelist,
	addNewMovie,
	doAddNewMovie,
	_renderDetailPage,
	_renderCreatePage,
	_renderHomePage
	
};