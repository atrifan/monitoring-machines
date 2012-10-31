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
	 	    console.log('ok');
	 		append (message.data);
	 		break;
	 	default : 
	 		break;
	 }
};

var write = function (msg) {
	$('.logger').html($('.logger').html()+'<font color="red">server: '+msg+"</font><br/>");
	
};

var append = function (msg) {
    $(".instaled_features").html('');
    for (i in msg){
        var x = document.createElement('option');
        $(x).val(i);
        $(x).text(msg[i]);
        console.log(x);
        $(".instaled_features").append(x);
    };
};


var myClient = new client();
myClient.setup();

