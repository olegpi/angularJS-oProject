'use strict';
angular.module('oStyleProject.main', ['ngRoute'])

    .controller('MainCtrl', ['$scope', '$translate', '$location', 'CustomConstants', '$rootScope', 'SearchItemInArray', function ($scope, $translate, $location, CustomConstants, $rootScope, SearchItemInArray) {
		
		$scope.itemList = [];
		var borderName = '';
		var radiusName = '';
		var borderThick_item = 1;
		var borderRadius_item = 1;
		var borderStyle_item = 'solid';
		var borderColor_item = '#000000';
		var bgColor_item = '#ffffff';
		
		var nameOfSides = ['top', 'bottom', 'right', 'left'];
		var nameOfCorner = ['tl', 'tr', 'br', 'bl'];
		var arrCorner = ['none', 'hidden', 'dotted',	 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial', 'inherit'];
		
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
		
		// init border Style
		onSetBorderValue($scope, nameOfSides, 'style', borderStyle_item);
		onSetBorderValue($scope, nameOfSides, 'thick', borderThick_item);
		onSetBorderValue($scope, nameOfCorner, 'corner', borderRadius_item);
		onSetBorderValue($scope, nameOfSides, 'color', borderColor_item);
		
		$scope.itemList['bg-color'] = bgColor_item;		
		$scope.listStyle = nameOfSides;
		$scope.listCorner = arrCorner;
		
		$scope.selectBorder = function(item) {
			if(item){
				borderName = item;
			}else{
				borderName = '';
				if(borderStyle_item){
					onSetBorderValue($scope, nameOfSides, 'style', borderStyle_item);
				}				
			}
		};
		
		/* Style */			
		$scope.selectBorderStyle = function(item) {
			borderStyle_item = item;
			if(borderName){
				$scope.itemList[borderName+'-style'] = borderStyle_item;
			}
			else{
				onSetBorderValue($scope, nameOfSides, 'style', borderStyle_item);
			}
		}; 
		
		/* Thick */		
		$scope.sliderThick = {
		  value: 1,
		  options: {
			floor: 0,
			ceil: 10,
			onChange: function(id, val) {
				if(borderName){
					$scope.itemList[borderName + '-thick'] = val;
					if(borderStyle_item){
						$scope.itemList[borderName+'-style'] = borderStyle_item;
					}
				}else{
					onSetBorderValue($scope, nameOfSides, 'thick', val);					
				}
			}			
		  }
		};
		
		/* Radius */
		$scope.selectBorderRadius = function(item) {
			if(item){
				radiusName = item;
				$scope.itemList[radiusName+'-corner'] = borderRadius_item;
			}else{
				radiusName = '';
				onSetBorderValue($scope, nameOfCorner, 'corner', borderRadius_item);
			}				
		};		
		
		$scope.sliderRadius = {
		  value: borderRadius_item,
		  options: {
			floor: 0,
			ceil: 50,
			onChange: function(id, val) {
				borderRadius_item = val;
				if(radiusName){
					$scope.itemList[radiusName+'-corner'] = val;					
				}else{
					onSetBorderValue($scope, nameOfCorner, 'corner', val);					
				}
			}			
		  }
		};
		
		/* Border Color */
		$scope.onChangeBorderColor = function(borderColor) {
			if(borderColor){
				if(borderName){
					$scope.itemList[borderName+'-color'] = borderColor;
				}
				else{					
					onSetBorderValue($scope, nameOfSides, 'color', borderColor);
				}
			}
		};
		/* Backgraund Color */
		$scope.onChangeBackgraundColor = function(bgColor) {
			if(bgColor){
				$scope.itemList['bg-color'] = bgColor;
			}
		};		
		
    }]); 
	
	function onSetBorderValue(scope, arrName, suffix, value){
		var arrayLength = arrName.length;
		for (var i = 0; i < arrayLength; i++) {
			scope.itemList[arrName[i] + '-' + suffix] = value;
			console.log(arrName[i] + '-' + suffix + ' = ' + value);
		}		
	}