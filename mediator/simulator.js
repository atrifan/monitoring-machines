var wbclient = require('websocket').client;
var ws_mediator = new wbclient();
ws_mediator.connect("ws://localhost:8080","echo-protocol");