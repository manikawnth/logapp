var chatApp = angular.module('chatApp',[]);

chatApp.factory('opchat', function(){
	var opmsgs = [];
	return opmsgs;
})

chatApp.factory('socket', function(){
	var socket = io.connect(window.location.hostname);
	return	socket;
})


function ChatCtrl($scope,opchat,socket){
	
	$scope.msgs = opchat;
	$scope.SendMsg = function(inmsg){
		socket.emit('sendevent',inmsg);
		$scope.ipmsg = '';
	};
	
	socket.on('recevent',function(outmsg){
		opchat.push(outmsg);
		$scope.$digest();
	});
	
}


function testctrl($scope,opchat){
	
	$scope.msgs = opchat;
	$scope.SendMsg = function(inmsg){
		opchat.push(inmsg);
		$scope.ipmsg = '';
	};
	
}