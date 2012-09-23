TCP_client = function(){
    var net = require('net');
    
    var HOST = '127.0.0.1';
    var PORT = 5000;
    this.my_client;
    var self=this;
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
    
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        self.my_client= client;
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
        client.write('I am a TCP mediator!');
    
    });
  
    client.on('error',function(error){console.log(error.toString() + " TCP server is down no connection");});
    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client.on('data', function(data) {
        console.log('DATA: ' + data);
        // Close the client socket completely
        
    });
    
    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        console.log('Connection closed to TCP server');
    });
};






webSocket_client = function(){
    var my_ws_connection;
    var lister= {
            "type" : "gatherer",
            "action" : "",
            "value" : "gatherer_1.0",
            "to" : ""
    };
    
    
    var WebSocketClient = require('websocket').client;
    
    this.client = new WebSocketClient();
    
    this.client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
    });
    
    this.client.on('connect', connectionHandler_WS);
    
    function connectionHandler_WS(connection){
        console.log('WebSocket client connected');
        my_ws_connection = connection;
        send("nickname", "gatherer_1.0");
        
        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', closeHandler_WS);
        connection.on('message', messageHandler_WS);
    
       
    };
    
    function send(action, value, to){
        lister.action = action;
        lister.value = value;
        lister.to = to;
        my_ws_connection.send(JSON.stringify(lister));
    };
    
    function closeHandler_WS(){
        console.log("WebSocket server is done");
    }
    
    function messageHandler_WS(msg){
        var data = msg.utf8Data.toString();
        var message = JSON.parse(data);
        switch (message.command) {
            case "install_list" :
                //var toSend = listInstall(message.machine_name);
                //send("programList", toSend, message.from);
                ws_to_tcp(message.machine_name);
                console.log("Recived request for programs on machine : "+message.machine_name+" from client : "+message.from);
                break;
        
            default: break;
        }
    }
    
    this.client.connect('ws://localhost:8080/', 'echo-protocol');
};

function ws_to_tcp(msg){
    tcp.my_client.write(msg);
}
tcp = new TCP_client();

wsc = new webSocket_client();

