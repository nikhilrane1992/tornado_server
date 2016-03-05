angular.module("ifscCodeApp", ['ui.bootstrap', 'angular-loading-bar'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  }])
.controller("ifscCodeCtrl", function($scope,$http){

    $scope.bankNameFileList = []
    $scope.inputBankName = ''
    $scope.inputBranchName = ''
    $scope.branchNameResultList = []
    $scope.bankIfscCodeJsonObj = {}
    $scope.bankDetail = {}

    $scope.getBranchName = function(bankNameTxt){
        $scope.inputBankName = bankNameTxt.split('.')[0];
        $http.post('/get_branch_ifsc_code/',{bankName: bankNameTxt}).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.bankIfscCodeJsonObj = data.bankIfscCodeJsonObj;
                $scope.branchNameResultList = []
                branchNameList();
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }

    $scope.getBankDetail = function(branchNameTxt){
        $scope.inputBranchName = branchNameTxt;
    }

    $scope.generateCode = function(){
        angular.forEach($scope.bankIfscCodeJsonObj, function(value, key){
            if (key==$scope.inputBranchName){
                $scope.bankDetail = value;
            }
        });
        console.log($scope.bankDetail);
    }

    var getBankNameList = function(){
        $http.get('/serve_bank_names/').
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.bankNameFileList = data.bankNameFileList;
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }

    var branchNameList = function(){
        angular.forEach($scope.bankIfscCodeJsonObj, function(value, key){
            $scope.branchNameResultList.push(key);
        });
    }


    var init = function(){
        getBankNameList();
    }
    init();

    
});

