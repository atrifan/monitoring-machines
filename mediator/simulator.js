var wbclient = require('websocket').client;
var ws_mediator = new wbclient();
ws_mediator.connect("ws://localhost:8080","echo-protocol");
ws_mediator.on("connect", connectHandler);
var my_connection;
var lister= {
        "type" : "gatherer",
        "action" : "",
        "value" : "gatherer_1.0",
        "to" : ""
};
function connectHandler(connection){
    my_connection = connection;
    send("nickname", "gatherer_1.0");
    connection.on("message", messageHandler);
    connection.on("close", closeHandler);
}

function closeHandler(){
    console.log("server down");
}

function listInstall(machineName) {
    valori = {
            "value1" : "value1",
            "value2" : "value2"
    };
    return valori;
}

function send(action, value, to){
    lister.action = action;
    lister.value = value;
    lister.to = to;
    my_connection.send(JSON.stringify(lister));
}

function messageHandler(msg){
    var data = msg.utf8Data.toString();
    var message = JSON.parse(data);
    switch (message.command) {
        case "install_list" :
            var toSend = listInstall(message.machine_name);
            send("programList", toSend, message.from);
            console.log("Recived request for programs on machine : "+message.machine_name+" from client : "+message.from);
            break;
    
        default: break;
    }
}