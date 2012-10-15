<?php

class TCP {
    
    public $socket;
    public $streams;
    
    function __construct(){
        
        error_reporting(E_ALL);
        
        /* Get the port for the WWW service. */
    //  $service_port = getservbyname('www', 'tcp');
        
        $service_port = 5000;
        
        
        /* Get the IP address for the target host. */
        $address = gethostbyname('qa-tc-server-6');
        //$address = '127.0.0.1';
        //$address = gethostbyname('localhost');
        
#       echo $address;
        
        /* Create a TCP/IP socket. */
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_set_nonblock($this->socket);
        $this->streams = array($this->socket/*, ... */);
        if ($this->socket === false) {
            echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
        } else {
            #echo "OK.\n";
        }
        
        echo "Attempting to connect to '$address' on port '$service_port'...";
        $result = socket_connect($this->socket, $address, $service_port);
        if ($result === false) {
            echo "socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
        } else {
#       echo "OK.\n";
        
        #echo socket_read($this->socket, 2048);
        
}
        
        
    }
    
    public function send($msg){
        
        socket_write($this->socket, $msg, strlen($msg));
        #echo "OK.\n";
    }
    
    public function recv(){
        while($resp = socket_read($sock, 8192)) {
             echo $resp;
            if (strpos($str, "#") !== false && strlen($str) === 1) break;
}
    }
    
    public function close(){
        
        echo "Closing socket...";
        socket_close($this->socket);
        echo "OK.\n\n";
    }
    
}

$x = new TCP();

?>