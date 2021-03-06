
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
        song();
        break;

    case "my-tweets":
        twitter();
        break;

    case "do-what-it-says":
        doWhat();
        break;

    default:
        break;
}




//Spotify
function song() {
    //If user does not enter a song
    if (search === undefined) {
        //This is not Ace of Base!!!
        var song = "The Sign"
    }else{
        song = search;
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        const track = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(track.artists[0].name);
        console.log(track.name);
        console.log(track.preview_url);
        console.log(track.album.name);
    });
    
}


//Twitter
function twitter() {
    var params = { screen_name: 'saltzman_scott' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //limit to 4 tweets (because I only have 4 tweets in 4 years...)
            for (var t = 0; t < 5; t++) {
                console.log(tweets[t].text);
                console.log(tweets[t].created_at);
                //adding break between tweets
                console.log("");
            }
        }
    });  
}


//OMDB
function omdb() {
    if (search === undefined) {
        //See Mr. Nobody!!!
        var movie = "Mr. Nobody"
    } else {
        movie = search;
    }
    request(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`, function (error, response, body) {
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

function doWhat() {
    
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }else{
            var random = (data.split(","));
            var runCommand = random[0];
            var itemSearch = random[1];
            switch (runCommand) {
                case "spotify-this-song":
                    spotify.search({ type: 'track', query: itemSearch }, function (err, data) {
                        const track = data.tracks.items[0];
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log(track.artists[0].name);
                        console.log(track.name);
                        console.log(track.preview_url);
                        console.log(track.album.name);
                    });
                    break;

                default:
                    break;
            }
        }
    })
}









