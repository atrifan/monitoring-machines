
var http = require('http');
var server = http.createServer();
server.listen(8080);

var websocket = require('websocket');
var ws = new websocket.server({httpServer: server,
    autoAcceptConnections: true});
var clients = [];

ws.on("connect", connectHandler);

function connectHandler(conn) {
    conn.nickname = conn.remoteAddress;
    console.log(conn.nickname + " conected to server");
    conn.on("message", messageHandler);
    conn.on("close", closeHandler);
    clients.push(conn);
}

function broadcast(data) {
    clients.forEach( function (client) {
        client.sendUTF(data);
    });
}

function emit(id, msg) {
	clients.forEach( function (client) {
		if (client.nickname == id)
			client.send(JSON.stringify(msg));
	});
	
}

function closeHandler() {
    var index = clients.indexOf(this);
    if (index > -1)
        clients.splice(index,1);
    //broadcast(this.nickname + " left the chat on 8080");
    console.log(this.nickname + " left server");
}

function messageHandler(msg) {
   var data = msg.utf8Data.toString();
   var message = JSON.parse(data);
   this.nickname = message.id;
   switch (message.type){
   	case "web_client" :
   		send_msg = {
   			"type" : "logger",
   			"data" : "Server recived machine name "+ '"'+message.machine_name+'"'
   		};
   		emit(this.nickname, send_msg);
   		break;
   	default : 
   		break;
   }
   
}