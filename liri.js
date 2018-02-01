
//adding .env file with api keys
require("dotenv").config();

//adding node file system package for read, write, append, etc
var fs = require('fs');

//adding js keys
var keys = require("./keys.js");

//adding twitter npm
var Twitter = require('twitter');

//adding spotify npm
var Spotify = require('node-spotify-api');

//adding request npm for http calls
var request = require('request');

//adding OMDB npm package
var omdbApi = require('omdb-client');
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

//accessing keys 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = new omdb(keys.OMDB);

//process arugments
var service = process.argv[2];
var search = process.argv[3];



if (service === "spotify") {
    spotify();
}else if(service === "twitter"){
    twitter();
}else if(service === "omdb"){
    omdb();
}



//Spotify
function spotify() {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // We will add the value to the random text file.
        fs.appendFile("random.txt", ", " + value, function (err) {
            if (err) {
                return console.log(err);
            }
        })
    });
    
}


//Twitter
function twitter() {
    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        // We will add the value to the random text file.
        fs.appendFile("random.txt", ", " + value, function (err) {
            if (err) {
                return console.log(err);
            }
        })
    });
    
}


//OMDB
function omdb() {
    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Release Year: " + JSON.parse(body).Year);
        }
        // We will add the value to the random text file.
        fs.appendFile("random.txt", ", " + value, function (err) {
            if (err) {
                return console.log(err);
            }
        })
    });
}





