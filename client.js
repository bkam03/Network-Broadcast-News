

const net = require( 'net' );

process.stdin.setEncoding( 'utf8' );

function establishServerConnections(){
  process.stdin.pipe( this );
  this.pipe( process.stdout );
}

var socket = net.createConnection( 6969, '0.0.0.0', establishServerConnections );


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
