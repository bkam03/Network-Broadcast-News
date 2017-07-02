
/*
  add admin broadcast
   the admin (server.js) can broadcast messages and each message will be prepended with `[ADMIN]`
*/

const net = require( 'net' );

function getUserNameandAttachListeners( data ){

    var transmittingPort = this.remotePort;
    this.userName = data.slice( 0, data.length - 1 );
    console.log( `username is -${ this.userName }-` );

    this.removeListener( 'data', getUserNameandAttachListeners );


    this.on( 'data', function( data ){
      for( var i = 0; i < socketArray.length; i++ ){
        if( socketArray[ i ].remotePort !== transmittingPort ){
          socketArray[ i ].write( `${ this.userName }: ${ data }` );
        }
      }
    } );

    this.on( 'close', function(){
      for( var i = 0; i < socketArray.length; i++ ){
        if( socketArray[ i ].remotePort == this.remotePort ){
          socketArray.splice( i, 1 );
          i--;
        }
      }
    } );

}


var myServer = net.createServer();
var socketArray = [];

myServer.listen( {
    host: '0.0.0.0',
    port: 6969
  }, function(){
    console.log( 'server is now listening to port 6969.' );

    myServer.on( 'connection', function( connectingSocket ){
      connectingSocket.setEncoding( 'utf8' );

      connectingSocket.write( 'set userName:' );
      connectingSocket.on( 'data', getUserNameandAttachListeners );

      socketArray.push( connectingSocket );

    } );

  }
);