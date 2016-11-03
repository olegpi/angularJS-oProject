'use strict';

angular.module('tCapital.error', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/error', {
    templateUrl: 'module/error/error.html',
    controller: 'ErrorCtrl'
  });
}])

.controller('ErrorCtrl', ['$scope', '$translate', '$location', 'CustomConstants', '$rootScope', 'SearchItemInArray', function($scope, $translate, $location, CustomConstants, $rootScope, SearchItemInArray) {
	
	// Added class in body
        $rootScope.bodylayout = (SearchItemInArray.searchByName(CustomConstants.bodyClasses, 'loginPage')).data; 
	
	$scope.currentPage = $location.path(); 

	// You can change the language during runtime  
	$scope.setLang = function(langKey) {
		$translate.use(langKey);
	};
	
        // Load Template
        $scope.header = SearchItemInArray.searchByName(CustomConstants.templates, 'header');
        $scope.footer = SearchItemInArray.searchByName(CustomConstants.templates, 'footer');

	// Verification if FirstName / LastName exists
	if( CustomConstants.firstName && CustomConstants.lastName){
		$scope.fullName = CustomConstants.firstName + ' ' + CustomConstants.lastName; 
	}
	
}]);