var db     = require('./mongo.js'),
// timeParser = require('./timeParse.js');
tracks      = db.dataInit('track');


module.exports = function(app){

  app.get('/', function(req, res) {
    res.render('index');
  });

  // ***
  // Gets track for a country
  // ***
  app.get('/toptracks/:country', function(req,res){
  	var q = tracks.find({country:req.params.country});
    console.log(q);
  });
};