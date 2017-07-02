/*
Use the net module to create a new server that listens on a specified address 0.0.0.0 and port 6969 and listens for and accepts socket connections.

Manage which sockets are connected, and maintain your sockets so that it removes any sockets that disconnect from your server.

Each connected socket is a Duplex stream, when it emits a 'data' event, broadcast the data to all sockets.
*/

const net = require( 'net' );

var myServer = net.createServer();
var socketArray = [];
var socketID = 0;



myServer.listen( {
    host: '0.0.0.0',
    port: 6969
  }, function(){
    console.log( 'server is now listening to port 6969.' );

    myServer.on( 'connection', function( connectingSocket ){
      connectingSocket.setEncoding( 'utf8' );

      var newSocket = {};
      connectingSocket.write( 'set userName:' );
      connectingSocket.on( 'data', getUserNameandAttachListeners );


      /*function( data ){

        connectingSocket.userName = data;
        console.log( 'username is', connectingSocket.userName );


        var transmittingPort = connectingSocket.remotePort;

        connectingSocket.on( 'data', function( data ){
          for( var i = 0; i < socketArray.length; i++ ){
            if( socketArray[ i ].remotePort !== transmittingPort ){
              socketArray[ i ].write( `${ this.userName }: ${ data }` );
            }

          }
        } );

        connectingSocket.on( 'close', function(){
          for( var i = 0; i < socketArray.length; i++ ){
            if( socketArray[ i ].remotePort == this.remotePort ){
              socketArray.splice( i, 1 );
              i--;
            }        }
        } );
      } );*/


      socketArray.push( connectingSocket );

    } );

  }
);

function getUserNameandAttachListeners( data ){

    this.userName = data.slice( 0, data.length - 1 );
    console.log( `username is -${ this.userName }-` );

    this.removeListener( 'data', getUserNameandAttachListeners );

    var transmittingPort = this.remotePort;

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