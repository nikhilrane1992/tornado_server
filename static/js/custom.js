angular.module("testApp", ['ui.bootstrap', 'angular-loading-bar'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
  }])
.controller("testCtrl", function($scope,$http){

    
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




    var init = function(){
        WebSocketTest();
    }
    init();

    
});

