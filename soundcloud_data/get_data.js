require('dotenv').load();
var db = require('./mongo.js');
var SC = require('node-soundcloud');
var Data = db.dataInit('track');

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


// josh soundcloud id: 15655722
// gbyo soundcloud id: 149515896
SC.get('/users/15655722/favorites', function(err, fav) {
	  if ( err ) {
	    throw err;
	  } else {
	  	for (var i = 2 - 1; i >= 0; i--) {
	  		var q = []
	  		// if user_id in database then don't api call
	  		// if(fav[1].user_id);

	  		//else
	  		// else api call on the user to get the location info 
			SC.get('/users/' + fav[i].user_id, function(err, user) {
				if ( err ) {
					throw err;
					} else {
						q = {user_id:user.id, track_id:fav[i].id, country:user.country, city:user.city}
						Data.create(q, function(err,doc){
					  if(err) throw err;
				})

				console.log('retrieved:', user);
				}
			});
	  	};
	  	// console.log("user_id", fav.length);
	   // SC.get('users/' + fav.user_id;
	  }
});




// # SOUNDCLOUD_ID=5feebc323728bc797a5363bec7d84a30
// # SOUNDCLOUD_SECRET=7e160e8321b393b6ffa507cda10e020c
// # SOUNDCLOUD_URI=https://soundcloud.com/connect
