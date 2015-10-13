var db     = require('./mongo.js'),
// timeParser = require('./timeParse.js');
tracks      = db.dataInit('track');


module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('index');
  });


  // ***
  // Gets total amount of tracks we have in db
  // ***
  app.get('/count', function(req,res){
    tracks.count({}, function(err, count){
      res.status(200).send(String(count));
    });
  });

  // ***
  // Gets track for a country
  // ***
  app.get('/toptracks/:country', function(req,res){
  	var q = tracks.find({country:req.params.country}).sort({playback_count: -1}).limit(10);
    q.exec(function(err, tracks){
      if (err) throw err;
      res.status(200).send(tracks);
    })
  });
};