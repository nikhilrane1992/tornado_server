angular.module("testApp", ['ui.bootstrap', 'angular-loading-bar'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  }])
.controller("testCtrl", function($scope,$http){

    
    var init = function(){
        
    }
    init();

    
});

