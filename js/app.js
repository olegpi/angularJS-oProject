'use strict';

// Declare app level module which depends on views, and components
angular.module('oStyleProject', [
    'ngRoute',
	'oStyleProject.main',
    'pascalprecht.translate',
    'ngSanitize',
    'ngCookies',
	'rzModule'
])

// main root config			
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl:  configData.urlHost[0] + "/module/main/main.html?v=1." + Math.floor(Math.random() * (9999 - 1000) + 1000),
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
			
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });				
	}])	
	
// translation config	
    .config(['$translateProvider', function ($translateProvider) {

        // Register a loader for the dynamic page
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [specified_url]?lang=[langKey].
        $translateProvider.useUrlLoader('/get_lang');

        $translateProvider.useStaticFilesLoader({
            prefix: configData.urlHost[0] + 'l10n/',
            suffix: '.json'
        });

        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en');

        // Tell the module to store the language in the cookies
        $translateProvider.useCookieStorage();

        // Enable escaping of HTML  
        $translateProvider.useSanitizeValueStrategy('sanitize');

    }])

// ***************************************** Start Factoty	
// CustomConstants
    .factory('CustomConstants', function ($location) {
        return {
            templates: [
				{name: 'host', url: configData.urlHost[0]},
                {name: 'header', url: configData.urlHost[0] + 'templates/header.html' + '?v=1.' + Math.floor(Math.random() * (9999 - 1000) + 1000)},
                {name: 'footer', url: configData.urlHost[0] + 'templates/footer.html' + '?v=1.' + Math.floor(Math.random() * (9999 - 1000) + 1000)},
            ],
            bodyClasses: [
                {name: 'main', data: 'main'}
            ],
			cookiesNames: [
				{name: '', data: ''}
			]
        };
    })
	
// Search Item in Array 
    .factory('SearchItemInArray', [function () {
        var obj = {};
        obj.searchByName = function (arr, itemName) {
            var result = {};
            arr.filter(
                    function (item) {
                        if (item.name === itemName)
                            result = item;
                    })[0];
            return result;
        };
        return obj;
    }])

	
// ***************************************** End Factoty
	
// ***************************************** StartFilter
// ***************************************** End Filter	

// ***************************************** Start Directive	
// ***************************************** End Directive
	
// Run Function, do not allow Cash Page - Use to All Pages
    .run(function ($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function () {
            $templateCache.removeAll();
        });
    });