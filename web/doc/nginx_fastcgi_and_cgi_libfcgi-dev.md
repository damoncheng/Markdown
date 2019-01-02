
## nginx + fastcgi(spawn-cgi(spawn fastcgi process) + libfcgi-dev) ##

### libfcgi-dev : 开发fastcgi的C库文件 ###

- install libfcgi-dev

    aptitude install libfcgi-dev

- code example:

        
        #include "fcgi_stdio.h"
        
        #include <stdlib.h>
        
        int main(void)
        
        {
        
            int count = 0;
        
            while (FCGI_Accept() >= 0)
            {
                printf("Content-type: text/html\r\n"
        
                "\r\n"
        
                "<title>FastCGI Hello!</title>"
        
                "<h1>FastCGI Hello!</h1>"
        
                "Request number %d running on host <i>%s</i>\n",
        
                ++count, getenv("SERVER_NAME"));
            }
            return 0;
        
        }

- compile example:

    g++ main.cpp -o demo -lfcgi++ –lfcgi
    

    Note: 加粗部分解释上述程序为什么在shell中直接执行时，第二次循环返回-1.
        
    知道一个客户端请求来的时候FCGI_Accept块才执行，并返回0。如果有一个系统故障，或是系统管理员终止进程，Accept将返回-1。
    
    **如果应用程序作为一个CGI程序被调用，那么第一次调用Accept时，返回0，第二次总是返回-1，产生CGI行为。（请详见20页的"FCGI_Accept (3)" ）**
    
    注意，在CGI中鼓励用小脚本，然而在FastCGI中则鼓励使用组合式的脚本。你可以在从新构想你的程序的全局结构，来获得FastCGI的高性能。
        
### install spawn-fcgi and spawn fastcgi###
   
   - install spawn-fcgi
   
     aptitude install spawn-fcgi
   
   - spawn fastcgi
   
     spawn-fcgi -a 127.0.0.1 -p 8081 -- fastcgi_path
     
### nginx configuration ###

        location /man2html {
           fastcgi_pass 127.0.0.1:8081;
           include fastcgi.conf;
        }
        
        
        
## nginx + cgi((spawn-cgi + fcgiwrap) + 任意cgi程序 ) ##        


### spawn-cgi and fcgiwrap ###

- install spawn-cgi 

    aptitude install spawn-fcgi
    
- install and use fcgiwrap

    aptitude install fcgiwrap
    
    spawn-fcgi -p 8081 -- (path of fcgiwrap) 
   
### mv cgi to specify directory ###

        /data/www/cgi-bin/man/man2html
    
### nginx configuration ###
 
        location ~ /cgi-bin.* {
            root /data/www/;
            fastcgi_pass 127.0.0.1:8081;
            include fastcgi.conf;
        }
        
        location / {
            root /data/www;
        }
        

### access cgi ###

http://localhost/cgi-bin/man/man2html            