#!/usr/bin/expect -f 

source /etc/damoncheng/expect_config.tcl
source $EXPECT_LIB/http_func.tcl

set host_path [get_host_path $argc $argv]
set host [lindex $host_path 0]
set path [lindex $host_path 1]


spawn telnet $host 80
expect { 
    "Escape character is '^]'." {
        send "OPTIONS *  HTTP/1.1"
        send "\n"
        send "HOST: $host"
        send "\n\n"
        exp_continue
    }
    -re "HTTP/1.. 200 OK" {
        puts "\n\n"
        exit
    }
}
