
var http = require('http');
var server = http.createServer();
server.listen(8080);

var websocket = require('websocket');
var ws = new websocket.server({httpServer: server,
    autoAcceptConnections: true});
var clients = [];

ws.on("connect", connectHandler);


/**
 * 
 * @param conn
 * This is the connection handler
 */
function connectHandler(conn) {
    conn.nickname = conn.remoteAddress;
    console.log(conn.nickname + " conected to server");
    conn.on("message", messageHandler);
    conn.on("close", closeHandler);
    clients.push(conn);
}

/**
 * Sends a message to all of the clients
 * @param data
 */
function broadcast(data) {
    clients.forEach( function (client) {
        client.sendUTF(data);
    });
}

/**
 * Sends a JSON to a specific client 
 * @param id
 * @param msg
 */
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


/**
 * @description There are two possible scenarios 1. u recive a message from the web_client or from the gatherer
 * if u recive a message from the client the first one will set the nickname of the websocket
 * @param msg
 * @returns
 */
function messageHandler(msg) {
   var data = msg.utf8Data.toString();
   var message = JSON.parse(data);
  
   switch (message.type){
   	
   case "web_client" :
   	    this.nickname = message.id;
   		send_msg = {
   			"type" : "logger",
   			"data" : "Server recived machine name "+ '"'+message.machine_name+'"'
   		};
   		emit(this.nickname, send_msg);
   		mesaj = {
   		        "from" : this.nickname,
   		        "command" : "install_list",
   		        "machine_name" : message.machine_name 
   		};
   		emit('gatherer_1.0', mesaj);
   		break;
   
   
   
   case "gatherer" :
   	    switch (message.action){
   	        case "nickname" : 
   	            console.log ('Set the program gatherer nickname to : '+message.value);
   	            this.nickname = message.value; 
   	            break;
   	            
   	        case "programList" :
   	            console.log ('Recived the program list from : ' + this.nickname);
   	            send_msg = {
   	              "type" : "machine_info",
   	              "data" : message.value
   	            };
   	            console.log(message.to);
   	            emit(message.to, send_msg);
   	            break;
   	            
   	        default : break;
   	    }
   	    break;
   	    
   	default : 
   		break;
   }
   
}