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

function find_favorites(userid, counter, limit)
{
	counter += 1;
	if (counter >= limit) { 
    // db.DB_close();
    return; };
	SC.get('/users/' + userid + '/favorites', function(err, fav) {
	  if ( err ) {
		throw err;
	  } else {
		for (var i = fav.length - 1; i >= 0; i--) {
			var q = new Object();
			// if user_id in database then don't api call
			// if(fav[1].user_id);
			// console.log(fav[i])
			q["track_id"]=fav[i].id;
			q["playback_count"]=fav[i].playback_count;
      add_to_db(q, fav[i]);
		};

    for (var i = fav.length - 1; i >= 0; i--) {
      find_favorites(fav[i].user_id, counter, limit)
    };
		// console.log("user_id", fav.length);
	   // SC.get('users/' + fav.user_id;
	  }
	});
}

function add_to_db(q, fav)
{
  SC.get('/users/' + fav.user_id, function(err, user) {
        if ( err ) {
          throw err;
          } else {
            q["user_id"]=user.id;
            q["country"]=user.country;
            q["city"]=user.city;
            console.log(q)
            if (user.country || user.city) {
              Data.create(q, function(err,doc){
               if(err) throw err;
            })
            };
            // add_to_db(user.id);
        // console.log('retrieved:', user);
          }
        });
}

find_favorites(4114825,0,3);



// function get_user(fav, q)
// {
// 	SC.get('/users/' + fav[i].user_id, function(err, user) {
// 		if ( err ) {
// 			throw err;
// 			} else {
// 				q["user_id"]=user.id
// 				q["country"]=user.country
// 				q["city"]=user.city
// 				console.log(q)
// 				Data.create(q, function(err,doc){
// 			  if(err) throw err;
// 		})

// 		// console.log('retrieved:', user);
// 		}
// 	});
// }