### section describe ###

- how to start and stop nginx, and reload its configuration

- explain the structure of the configuration file

- describes how to set up nginx to serve out static content

- how to configure nginx as proxy server

- how to connect it with a FastCGI application

### nginx work way ###

- one master process and several worker processes

- the main purpose of the master process is to read and evaluate configuration

- worker processes do actual processing of requests.

- nginx employs event-based model and OS-dependent machanisms to efficiently distribute requests among worker processes.

- The nummber of worker processes is defined in the configuration file and may be fixed for a given configuration or automatically adjusted to the number of available CPU cores

### Starting, Stopping, and Reloading Configuraion ###


 - syntax

		nginx -s signal
		
	where signal may be one of the following:
	
		* stop - fast shutdown
		* quit - graceful shutdown
		  stop nginx processes waiting for the worker processes to finish serving current requests
		* reload - reloading the configuration file
		  if success, old worker processes stop accepting new connection and quit(not stop)
		* reopen - reopening the log files
		
 
- send signal to nginx by system command

		- ps -ax | grep nginx
		- kill -s QUIT 1628 		
	
	
### Configuration File's Structure ###

- **nginx consists of modules which are controlled by directives specified in the configuration file.**

- Directives are divided into simple directies and block directives.  

	- a simple directive

		consists of the name and parameters separated by spaces and ends with a semicolon(;).

	- a block directive

		the same structure as a simple directive, but instead of the semicolon it ends with a set of additional instructions surrounded by braces({ and }).

		if a block directive can have other directives inside braces, it is called a context(examples: events, http, esrver, and location).

		Directives placed in the configuraton file outside of any contexts are considered to be in the main context. The events and http directives reside in the main context, server in http, and location in server.

	- The rest of a line after the # sign is considered a comment.


### Serving Static Content ###

	http {
		server {
			location / {
				root /data/www;
			}
			location /images {
				root /data;
			}
		}
	}

- configure file may include several server blocks **distinguished by ports** on which they listen to and by server names.

- nginx test URI decide which server processes a request

- If there are serveral matching location blocks nginx selects the **one with the longest prefix**.

### Setting Up a Simple Proxy Server ###	

	http {
		server {
		    listen 8080;
			root /data/up1;
			location / {
				proxy_pass http://localhost:8080;
			}
			
			location ~ \.(gif|jpg|png) {
				root /data/images;	
			}
		}
	}


- Function: receives requests, passes them to the proxied servers, retrieves responses from them, and sends them to the clients.

- a regular expression should be preceded with ~.

- location remember the longest prefix, and then checks regular expressoins. The searching of regular expressoins terminates on the first match, and the corresponding configuraton is used.if no match, the longest prefix is used.

- location syntax

		Syntax: location [= | ~ | ~* | ^~] uri {...}
		Default: -
		Context: server, location

		location = / {
			[configuration A]
		}
		#exact match and terminate

		location / {
			[configuration B]
		}

		location /documents/ {
			[configuration C]
		}
		#prefix match and remember the longest prefix, then checks regular expressions,
		terminates on the first match, if not match, the longest prefix is used

		location ^~ /images/ {
			[configuration D]
		}
		#prefix match, if the longest prefix in it, not checks regular expressions 

		location ~ \.(gif|jpg|jpeg)$ {
			[configuration E]
		}
		#regular expressions and case-sensitive matching

		location ~* \.(gif|jpg|jpeg)$ {
			[configuration E]
		}
		#regular expressions and case-insensitive matching

### Setting Up FastCGI Proxying ###

	server {

		location / {
			fastcgi_pass localhost:9000;
			fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name
			fastcgi_param QUERY_STRING $query_string;
		}

		location ~ \.(gif|jpg|png)$ {
			root /data/images;
		}
		
	}


- nginx can be used to route requests to FastCGI servers which run applications built with various frameworks and programming laguages such as PHP.

- fastcgi_param directives to set parameters passed to a FastCGI server.

	SCRIPT_FILENAME parameter is used for determining the script name

	QUERY_STRING parameter is used to pass requst parameters.

- This will set up a server that will route all requests except for requests for static images to the proxied server operating on localhost:9000 through the FastCGI protocol.

- nginx + python-flup

	- nginx.conf

			server 
			{
				listen 8000;
				server_name test.com;
				location /
				{
					fastcgi_pass 127.0.0.1:8008;
					fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name
					fastcgi_param QUERY_STRING $query_string;
				}
			}

	- fcgi.py

			#!/usr/bin/python
			#encoding: utf-8

			from flup.server.fcgi import WSGIServer

			def myapp(environ, start_response):
				start_response("200 OK", [('Content-Type', 'text/plain')])
				return ['Hello World\n']


			if __name__ == "__main__":
				WSGIServer(myapp.bindAddress=('127.0.0.1', 8008)).run()

	- access way

			http://serverip:8000/