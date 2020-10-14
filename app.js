const express = require( "express" );
const app = express();


// home page route
app.get( "/", function( req, res ){
    res.render( "homepage.ejs" );
} );

// Add Games page route
app.get( "/addgame", function( req, res ){
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
