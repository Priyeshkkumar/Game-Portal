const express = require("express");
const express = require( "express" );
const app = express();

// To use content of public folder
app.use( express.static ("public" ) );

// Games object to hold game related details

// home page route
app.get( "/", function( req, res ){
    res.render( "homepage.ejs" );
} );

// Add Games page route
app.get( "/addgames", function( req, res ){
    res.render( "addgames.ejs" );
} );

// 404 route
app.get( "*", function( req, res ){
    res.send( "404 Page Not found" );
} );

app.listen( 3000, function( error ){
    if(error){
        console.log(error);
    }else{
        console.log("Server Started");
    }
} );
