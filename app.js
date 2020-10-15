const express = require( "express" );
const app = express();
// Package to parse the POST route's data
const bodyParser = require( "body-parser" );
// Package to use uploaded files
const fileUpload = require( "express-fileupload" );

// Package to MongoDb
const mongoose = require( "mongoose" );

mongoose.connect( "mongodb://127.0.0.1:27017/testdb", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, function(error){
    if( error ){
        console.log(error);
    }else{
        console.log("Connected to database");
    }
} );

// DB schema
var gameSchema = new mongoose.Schema({
    gameName: String,
    creatorName: String,
    gameHeight: Number,
    gameWidth: Number,
    gameFile: String,
    thumbnailFile: String
});

var gameObj = mongoose.model( "gameObj", gameSchema );

// To use content of public folder
app.use( express.static ("public" ) );

// Games object to hold game related details

// home page route
app.get( "/", function( req, res ){
    gameObj.find( {}, function( error, ReturnedgameObj ){
        if( error ){
            console.log( "Pblm retrieving game data" );
            console.log( error );
        }
        else{
            res.render( "homepage.ejs",{
                gamesList: ReturnedgameObj,
            } );
        }
    } );
} );

// Add Games GET route
app.get( "/addgames", function( req, res ){
    res.render( "addgames.ejs" );
} );

// Using body-parser package
app.use( bodyParser.urlencoded({extended: true }));
app.use( bodyParser.json() );

// Uisng file upload package
app.use( fileUpload() );

// Add Games POST route
app.post( "/addgames", function( req, res ){
    var gameData = req.body;
    var gameFile = req.files.gameFile;
    var thumbnailFile = req.files.thumbnailFile;

    // Moving uploaded file to public/ folders
    gameFile.mv( "public/games/" + gameFile.name, function( error ){
        if( error ){
            console.log("Cannot upload game file");
        }else{
            console.log("Game file uploaded");
        }
    } );
    thumbnailFile.mv( "public/games/thumbnails/" + thumbnailFile.name, function( error ){
        if( error ){
            console.log("Cannot upload thumbnail file");
        }else{
            console.log("Thumbnail file uploaded");
        }
    } );

    gameObj.create({
        gameName: gameData.gameName,
        creatorName: gameData.creatorName,
        gameHeight: gameData.gameHeight,
        gameWidth: gameData.gameWidth,
        gameFile: gameFile.name,
        thumbnailFile: thumbnailFile.name
    }, function(error){
        if(error){
            console.log( "Pblm adding game to database" );
        }else{
            console.log( "Game Added Successfully" );
        }
    });

    res.redirect("/");

} );

// 404 route
app.get( "*", function( req, res ){
    res.send( "404 Page Not found" );
} );

app.listen( 3000, function( error ){
    if(error){
        console.log(error);
    }else{
        console.log("Server Started on port 3000");
    }
} );
