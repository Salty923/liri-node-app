
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

//accessing keys 
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = new omdb(keys.OMDB);

//process arugments
var service = process.argv[2];
var search = process.argv[3];
