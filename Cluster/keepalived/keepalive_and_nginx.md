
#-- master --#

vrrp_instance VI_1 {

    interface eth1
    state MASTER
    priority 200
    advert_int 2

    virtual_router_id 33

    authentication {
       auth_type PASS
       auth_pass 123456
    }

    virtual_ipaddress {
       10.85.0.222
    }

}

#-- slave --#

vrrp_instance VI_1 {

    interface eth1
    state BACKUP
    priority 100
    advert_int 2

    virtual_router_id 33
    
    authentication {
       auth_type PASS
       auth_pass 123456
    }
   
    virtual_ipaddress {
       10.85.0.222
    }

}
   
#---nginx http 高可用配置---#
upstream master.jenkins.qcloud.com {

    server 10.85.0.84:8080 fail_timeout=3s;
    server 10.85.0.83:8080 backup;

}

server {
    listen       80;
    ignore_invalid_headers off;

    location / {

        proxy_connect_timeout 1s;
        proxy_pass http://master.jenkins.qcloud.com/;
    }

}

tcp反向代理支持

https://github.com/yaoweibin/nginx_tcp_proxy_module

#---nginx tcp 集群代理配置---#
tcp {

    timeout 1d;     
    proxy_read_timeout 10d;
    proxy_send_timeout 10d;
    proxy_connect_timeout 30;    #timeout milliseconds

    upstream master.jenkins.slave.qcloud.com {

        server 10.125.50.54:36093;
        server 10.125.50.57:36093;
  
        check interval=1000 rise=1 fall=3 timeout=2000;

    }

    server {
            listen  36093;
            proxy_pass master.jenkins.slave.qcloud.com;
            so_keepalive on;
            tcp_nodelay on;

    }


}
