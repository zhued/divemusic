var app = angular.module('divemusic', []);

app.controller('HomeController', ['$http', function($http) {
  var map = new Datamap({element: document.getElementById('container')});
  
  var ui = this;
  ui.response = false;

  // ui.getSummoner = function() {
  //   if (ui.summonerName) {
  //     var querystring = (ui.summonerName).toLowerCase().replace(/ /g, '');
  //     $http.get('/summoner/'+querystring).success(function(data) {
  //       ui.resData = data;
  //       ui.timeData = timeParse(data);
  //       ui.summoner = data[0].summoner_id;
  //       drawCal();
  //       ui.response = true;
  //     });
  //   }
  // };
}]);
