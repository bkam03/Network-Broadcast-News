/*
Create a new net.Socket and connect to your running socket server.

Once connected, pipe your terminal's standard input stream to write to your connected socket.

Whenever the connected socket (client) emits a 'data' event, then data is being broadcasted from the server, pipe that data out to your terminal's standard output stream.
*/

/*
add username registration
   once connected, the new client will be prompted to enter a username, store the username and then allow them to broadcast messages with all messages prepended with their username.
*/

const net = require( 'net' );

process.stdin.setEncoding( 'utf8' );

function establishServerConnections(){
/*  this.setEncoding( 'utf8' );
*/  process.stdin.pipe( this );
  this.pipe( process.stdout );

  /*process.stdout.write( 'choose a user name:' );
  process.stdin.on( 'data', createUserName );*/
}

/*function createUserName( data ){
    process.stdout.write( 'choose a user name:' );
    userName = process.stdin.read();
    console.log( `userName is ${ userName }`);
  userName = data;
  console.log( userName );
  process.stdin.removeListener( 'data', function(){

  } );
}*/





var socket = net.createConnection( 6969, '0.0.0.0', establishServerConnections );

//var socket = net.createConnection( 6969, '0.0.0.0', establishServerConnections );



/*function(){
  //console.log( 'there is a client connection' );

  //encoding
  socket.setEncoding( 'utf8' );

  process.stdin.pipe( socket );
    process.stdin.on( 'data', function( chunk ){
      //console.log( 'stdin: ' + chunk );
      socket.write( chunk );
    //console.log( socket );
    });

  socket.pipe( process.stdout );
/*    socket.on( 'data', function( chunk ){
      console.log( chunk );

    } );*/

/*  socket.on( 'data', function( chunk ){
    process.stdout.write( chunk );
    console.log( 'socket stdout' );
  });*/

//} );*/

//this socket is connected