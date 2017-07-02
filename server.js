/*
Use the net module to create a new server that listens on a specified address 0.0.0.0 and port 6969 and listens for and accepts socket connections.

Manage which sockets are connected, and maintain your sockets so that it removes any sockets that disconnect from your server.

Each connected socket is a Duplex stream, when it emits a 'data' event, broadcast the data to all sockets.
*/

const net = require( 'net' );

var myServer = net.createServer(  );
var socketArray = [];

myServer.listen( {
    host: '0.0.0.0',
    port: 6969
  }, function(){
    console.log( 'server is now listening to port 6969.' );

    myServer.on( 'connection', function( connectingSocket ){
      console.log( 'connection event detected.' );

      connectingSocket.on( 'data', function( data ){
        console.log( 'data event detected.' );
        console.log( 'server receiving ' + data );
       for( var i = 0; i < socketArray.length; i++ ){
          socketArray[ i ].write( data );
          console.log( `sending ${ data } to everything in the array supposedly` );
        }
      } );

      socketArray.push( connectingSocket );

    } );


  }
);


//the event listener has picked up a connection