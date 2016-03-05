$(function(){
$("#addClass").click(function () {
          $('#qnimate').addClass('popup-box-on');
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  })


app = angular.module("testApp", ['ui.bootstrap', 'angular-loading-bar'])


app.filter('groupBy', function() {
    return _.memoize(function(items, field) {
            return _.groupBy(items, field);
        }
    );
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  }])

app.controller("testCtrl", function($scope,$http){

	$scope.chatMessagesList = [];

	$scope.statusMessage = "";

    
	// ------------------ websocket starts--------------------------
	var WebSocketTest = function() {

		if ("WebSocket" in window){
			console.log("WebSocket is supported by your Browser!");

			// Let us open a web socket
			var ws = new WebSocket("ws://localhost:8888/tornado/webSocket/get_json/");

			ws.onopen = function()
			{
				// Web Socket is connected, send data using send()
				ws.send("This message is sent by Javascript!!");
				console.log("Message is sent to Tornado...");
			};

			ws.onmessage = function (evt)
			{
				var received_msg = JSON.parse(evt.data);
				console.log(received_msg);
				$scope.chatMessagesList.push(received_msg);
				console.log($scope.chatMessagesList);
			};

			ws.onclose = function(){
				// websocket is closed.
				console.log("Connection is closed...");
			};
		}else{
			// The browser doesn't support WebSocket
			console.log("WebSocket NOT supported by your Browser!");
		}
	};


// ---------------------- websocket ends----------------------

$scope.addinList = function(){
	date = new Date();
	obj = {"date": date, "chatName": "Nikhil", "message": $scope.statusMessage, "chatReplyName": "Singh"}
	// $scope.chatMessagesList.push($scope.obj);
	$scope.statusMessage = "";
	$http.post('/tornado/webSocket/send_json/',obj).
	success(function(data, status, headers, config) {
		console.log(data);
	}).
	error(function(data, status, headers, config) {
		console.log(data);
	});
}


$scope.sendMessageToServer = function(bankNameTxt){
        
    }

    var init = function(){
        WebSocketTest();
    }
    init();

    
});

