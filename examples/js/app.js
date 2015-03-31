(function(){

'use strict';

angular.module('sidebarMenuDemo', [
	'ui.bootstrap',
	'ui.bootstrap.sidebarMenu'
])

.controller('DemoController', ['$scope', '$http', function($scope, $http){
	$http.get('js/menu.json')
		.success(function(data) {
			$scope.menu = data;
		});	
}]);

})();