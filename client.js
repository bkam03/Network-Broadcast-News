/*
Create a new net.Socket and connect to your running socket server.

Once connected, pipe your terminal's standard input stream to write to your connected socket.

Whenever the connected socket (client) emits a 'data' event, then data is being broadcasted from the server, pipe that data out to your terminal's standard output stream.
*/

const net = require( 'net' );


var socket = net.createConnection( 6969, '0.0.0.0', function(){
  console.log( 'there is a client connection' );

  //encoding
  socket.setEncoding( 'utf8' );

  process.stdin.pipe( socket );
/*    process.stdin.on( 'data', function( chunk ){
      //console.log( 'stdin: ' + chunk );
      socket.write( chunk );
    //console.log( socket );
    });
*/
  socket.pipe( process.stdout );
/*    socket.on( 'data', function( chunk ){
      console.log( chunk );

    } );*/

/*  socket.on( 'data', function( chunk ){
    process.stdout.write( chunk );
    console.log( 'socket stdout' );
  });*/
} );

//this socket is connected