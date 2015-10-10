require('dotenv').load();
var SC = require('node-soundcloud');
 

// Initialize client
SC.init({
  id: process.env.SOUNDCLOUD_ID,
  secret: process.env.SOUNDCLOUD_SECRET,
  uri: process.env.SOUNDCLOUD_URI,

});
 
// Connect user to authorize application
var initOAuth = function(req, res) {
  var url = SC.getConnectUrl();
 
  res.writeHead(301);
  res.end();
};


var redirectHandler = function(req, res) {
  var code = req.query.code;
 
  SC.authorize(code, function(err, accessToken) {
    if ( err ) {
      throw err;
    } else {
      // Client is now authorized and able to make API calls
      console.log('access token:', accessToken);
    }
  });
};


// SC.get('/resolve', { url: 'https://soundcloud.com/gbyo'}, function(err, user) {
// 	 if ( err ) {
// 	    throw err;
// 	  } else {
//   		console.log(user);
// 	  }
// });


// SC.get('/users/149515896', function(err, user) {
// 	  if ( err ) {
// 	    throw err;
// 	  } else {
// 	    console.log('retrieved:', user);
// 	  }
// });


SC.get('/users/15655722/favorites', function(err, fav) {
	  if ( err ) {
	    throw err;
	  } else {
	    console.log('favorites retrieved:', fav);
	  }
	});


// # SOUNDCLOUD_ID=5feebc323728bc797a5363bec7d84a30
// # SOUNDCLOUD_SECRET=7e160e8321b393b6ffa507cda10e020c
// # SOUNDCLOUD_URI=https://soundcloud.com/connect
