TCP_client = function(){
    var net = require('net');
    
    var HOST = '127.0.0.1';
    var PORT = 5000;
    
    var client = new net.Socket();
    client.connect(PORT, HOST, function() {
    
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
        client.write('I am Chuck Norris!');
    
    });
    
    // Add a 'data' event handler for the client socket
    // data is what the server sent to this socket
    client.on('data', function(data) {
        
        console.log('DATA: ' + data);
        // Close the client socket completely
        
    });
    
    // Add a 'close' event handler for the client socket
    client.on('close', function() {
        console.log('Connection closed');
    });
};

webSocket_client = function(){
    var WebSocketClient = require('websocket').client;
    
    var client = new WebSocketClient();
    
    client.on('connectFailed', function(error) {
        console.log('Connect Error: ' + error.toString());
    });
    
    client.on('connect', function(connection) {
        console.log('WebSocket client connected');
        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function() {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                console.log("Received: '" + message.utf8Data + "'");
            }
        });
    
       
    });
    
    client.connect('ws://localhost:8080/', 'echo-protocol');
};

TCP_client();
webSocket_client();

