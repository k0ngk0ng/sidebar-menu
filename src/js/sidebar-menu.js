(function(){

'use strict';

angular.module('ui.bootstrap.sidebarMenu', [
	'ui.bootstrap.collapse'
])

.directive('sidebarMenu', function(){
	return {
		restrict: 'EA',
		templateUrl: 'templates/menu.html',
		replace: true,
		scope: {
			menuItems: '='
		},
		link: function(scope, element, attrs, controller) {
			
		}
	};
})

.directive('sidebarMenuItem',['$compile', function($compile){
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			menuItem: '='
		},
		templateUrl: 'templates/menuItem.html',
		compile: function(element, attrs){ 
			var contents = element.contents().remove();
			var compiledContents;
			return { 
				post: function(scope, element){
				   
					if(!compiledContents){
						compiledContents = $compile(contents);
					}					
					compiledContents(scope, function(clonedElement){
						element.append(clonedElement);
					});					
				}
			};			
		}	
	};
}]);

})();