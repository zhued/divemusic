var app = angular.module('divemusic', []);
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://w.soundcloud.com/**'
  ]);
});


app.controller('HomeController', ['$http', '$scope', function($http, $scope) {
	var map = new Datamap({
		element: document.getElementById('container'),
		fills: {
				HIGH: '#afafaf',
				LOW: '#123456',
				MEDIUM: 'blue',
				UNKNOWN: 'rgb(0,0,0)',
				defaultFill: '#afafaf'
		},
		done: function(datamap) {
			datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				var m = {};
				m[geography.id] = '#000000';
				datamap.updateChoropleth(m);
				var country = geography.properties.name;
				$scope.selectedCountry = country;
				$http({
					method: 'GET',
					url: '/toptracks/' + country
				}).then(function(topTracks){
					// $scope.toptracks = topTracks;
					// var top = [];

					// topTracks.data.forEach(function(track){
						// newtrack = angular.toJson(track);
						// top.push(newtrack);
					// })
					$scope.toptracks = topTracks.data;
				});
			});
		}
	});

	$scope.getIframeSrc = function(src) {
	  return 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + src + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
	};

	var ui = this;
	ui.response = false;

	// ui.getSummoner = function() {
	// 	if (ui.summonerName) {
	// 		var querystring = (ui.summonerName).toLowerCase().replace(/ /g, '');
	// 		$http.get('/summoner/'+querystring).success(function(data) {
	// 			ui.resData = data;
	// 			ui.timeData = timeParse(data);
	// 			ui.summoner = data[0].summoner_id;
	// 			drawCal();
	// 			ui.response = true;
	// 		});
	// 	}
	// };
}]);
