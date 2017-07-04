
/*
  add admin broadcast
   the admin (server.js) can broadcast messages and each message will be prepended with `[ADMIN]`
*/

const net = require( 'net' );

function getUserNameandAttachListeners( data ){
    //if( true ){


      this.userName = data.slice( 0, data.length - 1 );
      console.log( `username is -${ this.userName }-` );

      this.removeListener( 'data', getUserNameandAttachListeners );
   // }

      attachInputListener( this );

    /*this.on( 'data', function( data ){
      for( var i = 0; i < socketArray.length; i++ ){
        if( socketArray[ i ].remotePort !== this.remotePort ){
          socketArray[ i ].write( `${ this.userName }: ${ data }` );
        }
      }
    } );*/

    this.on( 'close', function(){
      for( var i = 0; i < socketArray.length; i++ ){
        if( socketArray[ i ].remotePort == this.remotePort ){
          socketArray.splice( i, 1 );
          i--;
        }
      }
    } );

}

function attachInputListener( stream ){
  stream.on( 'data', function( data ){
  for( var i = 0; i < socketArray.length; i++ ){
    if( socketArray[ i ].remotePort !== stream.remotePort ){
      socketArray[ i ].write( `${ stream.userName }: ${ data }` );
    }
  }
} );
}




/*  var adminAccount = net.createConnection( 6969, '0.0.0.0', function(){
    process.stdin.setEncoding( 'utf8' );
    this.userName = 'ADMIN';


    process.stdin.pipe( this );
    this.pipe( process.stdout );
  } );*/




var myServer = net.createServer();
var socketArray = [];

myServer.listen( {
    host: '0.0.0.0',
    port: 6969
  }, function(){
    console.log( 'server is now listening to port 6969.' );

    process.stdin.setEncoding( 'utf8' );

    /*var adminAccount = new net.Socket();
    adminAccount.userName = 'ADMIN';
    adminAccount.connect( 6969, '0.0.0.0', function(){
      process.stdin.pipe( this );
      this.pipe( process.stdout );

      attachInputListener( this );

      socketArray.push( adminAccount );*/

      myServer.on( 'connection', function( connectingSocket ){
        connectingSocket.setEncoding( 'utf8' );

        //console.log( !connectingSocket.hasOwnProperty( 'userName' ) );
        connectingSocket.write( 'set userName:' );
        connectingSocket.on( 'data', getUserNameandAttachListeners );

        socketArray.push( connectingSocket );
      } );
/*    } );*/

      var adminAccount = net.createConnection( 6969, '0.0.0.0', function(){
        process.stdin.pipe( this );
        this.pipe( process.stdout );
        this.write( 'ADMIN ' );
      } );
});