'use strict';
angular.module('oStyleProject.main', ['ngRoute'])

    .controller('MainCtrl', ['$scope', '$translate', '$location', 'CustomConstants', '$rootScope', 'SearchItemInArray', function ($scope, $translate, $location, CustomConstants, $rootScope, SearchItemInArray) {
		
		$scope.itemList = [];
		var borderName = '';
		var radiusName = '';
		var sliderRadius_item = 1;
        //Added class in body
        $rootScope.bodylayout = (SearchItemInArray.searchByName(CustomConstants.bodyClasses, 'main')).data;

        // Path to curent Page, need to translate
        $scope.currentPage = $location.path();
		
        // Return current language
        $scope.currentLang = $translate.proposedLanguage() || $translate.use();
		
        // You can change the language during runtime  
        $scope.setLang = function (langKey) {
            $translate.use(langKey);
        };
		
        // Load Template
		$scope.host = SearchItemInArray.searchByName(CustomConstants.templates, 'host');
        $scope.header = SearchItemInArray.searchByName(CustomConstants.templates, 'header');
        $scope.footer = SearchItemInArray.searchByName(CustomConstants.templates, 'footer');
		
		$scope.selectBorder = function(item) {
			if(item){
				borderName = item;
			}			
		};
		
		$scope.selectBorderStyle = function(item) {
			console.log(item);
			if(item){
				$scope.itemList[borderName+'-style'] = item;
			}			
		}; 		
		
		$scope.sliderThick = {
		  value: 1,
		  options: {
			floor: 0,
			ceil: 10,
			onChange: function(id, val) {
				$scope.itemList[borderName + '-thick'] = val;
			}			
		  }
		};
		
		$scope.selectBorderRadius = function(item) {
			if(item){
				radiusName = item;
				$scope.itemList[radiusName] = sliderRadius_item;
			}else{
				radiusName = '';
				$scope.itemList["tl"] = sliderRadius_item;
				$scope.itemList["tr"] = sliderRadius_item;
				$scope.itemList["br"] = sliderRadius_item;
				$scope.itemList["bl"] = sliderRadius_item;
			}				
		};		
		
		$scope.sliderRadius = {
		  value: sliderRadius_item,
		  options: {
			floor: 0,
			ceil: 100,
			onChange: function(id, val) {
				if(radiusName){
					$scope.itemList[radiusName] = val;
					sliderRadius_item = val;
				}else{
					$scope.itemList["tl"] = val;
					$scope.itemList["tr"] = val;
					$scope.itemList["br"] = val;
					$scope.itemList["bl"] = val;	
				}
			}			
		  }
		};	
    }]); 