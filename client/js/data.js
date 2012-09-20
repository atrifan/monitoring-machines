function client(){
	this.webSocket;
	this.info = {
			"type" : "web_client",
			"id" : (new Date().getTime())*Math.random(),
			"machine_name" : "",
			
	};
}

client.prototype.setup = function() {
	 this.webSocket = new WebSocket("ws://127.0.0.1:8080");
	 this.webSocket.addEventListener("open", function() { write("Connection established");}, false);
	 this.webSocket.addEventListener("message", this.messageHandler, true);
	 this.webSocket.addEventListener("close", function() { write("Connection lost");}, false);
};

client.prototype.messageHandler = function (msg) {
	
	 var message = JSON.parse(msg.data);
	 switch (message.type) {
	 	case "logger" : 
	 		write (message.data);
	 		break;
	 	case "machine_info" : 
	 		append (message.data);
	 		break;
	 	default : 
	 		break;
	 }
};

var write = function (msg) {
	$('.logger').val($('.logger').val()+"server: "+msg+"\r\n");
	
};


var myClient = new client();
myClient.setup();

$(document).ready(function(){	
	$('input[name="machine_name"]').keydown(function(e) {
		if (e.keyCode == 13){
			myClient.info.machine_name = $(this).val();
			console.log(myClient.info.id, " : ", myClient.info.machine_name);
			myClient.webSocket.send(JSON.stringify(myClient.info));
		}
	});
});




