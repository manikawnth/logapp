/* ******************************************************** 
  This is the Server File for ABG Reports Web applications
 ******************************************************** */

var express = require('express'),		//Get the EXPRESS Module
	app 	= express();				//Define an express application handler

var http	= require('http'),			//Get the HTTP Module
	server	= http.createServer(app);	//Create a http server app for Chat application of scoket io	

var path 	= require('path');
var io		= require('socket.io').listen(server); // io - this is a socket io listener for a http server 


/* Serve Static files from /Client folder */
app.use(express.static(__dirname + '/client'));


/* Express Route for home page */
app.get('/',function(req,res){
	res.sendFile(__dirname + '/client/index.html');
});


/* Socket.io connection event and corresponding call-back function for listening further message events on socket */
io.on('connection', function(socket){

	/*	Listen the send event for incoming messages on the server */
	socket.on('sendevent',function(data){
		console.log(data);
		/*	Emit the rec event for incoming messages on the server */
		io.emit('recevent',data);
	});


	console.log('a user connected');
});


/* NOTE: You can't listen on an express app as app.listen(). You need to listen on pure http server as server.listen() */
server.listen(process.env.PORT || 3030,function(){
	console.log('Listening on port 3030');
});