
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

//process arugments
var service = process.argv[2];
var search = process.argv[3];



switch (service) {
    case "movie-this":
        omdb();
        break;

    case "spotify-this-song":
        spotify();
        break;

    case "my-tweets":
        spotify();
        break;

    case "do-what-it-says":
        doWhat();
        break;

    default:
        break;
}



// function fsAppend() {
//     fs.appendFile("random.txt", ", " + value, function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })
// }



//Spotify
function spotify() {
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
}


//Twitter
function twitter() {
    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
        
    });
}


//OMDB
function omdb() {
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${search}`, function (error, response, body) {
        //parse JSON and store to const data
        const data = JSON.parse(body);

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log(data.Title);
            console.log(data.Year);
            console.log(data.imbdRating);
            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);

        }
    });
}


//I want
function doWhat() {
    request('http://www.omdbapi.com/?apikey=trilogy&t="I Want it That Way"', function (error, response, body) {
        //parse JSON and store to const data
        const data = JSON.parse(body);

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log(data.Title);
            console.log(data.Year);
            console.log(data.imbdRating);
            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);

        }
    });
}





