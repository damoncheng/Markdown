- install python => pip => django and install nginx


### WUSGI ###

- install uwsgi

- verify uwsgi

	- test.py

			def application(env, start_response):
				start_response('200 OK', [('Content-Type','text/html')])
				return "Hello World"

	- run uwsgi

			uwsgi --http-socket :8000 --plugin python --wsgi-file test.py --process 3


- generate a uwsgi configure file

		[uwsgi]
		socket = 127.0.0.1:8001
		uid = root
		gid = root
		master = true         //主进程
		workers = 2           //子进程数   
		max-requests = 1000   
		pidfile = /var/run/uwsgi8000.pid    //pid文件，用于下面的脚本启动、停止该进程
		daemonize = /website/uwsgi8000.log  (使用supervisor的时候，这个配置不能要,由supervisor接管)
		plugins = python
		stats = 127.0.0.1:8002
	        pythonpath = /usr/local/lib/python2.7/dist-packages


- run uwsgi

		uwsgi -d --ini configure_path

- reload uwsgi configure file

		uwsgi --reload /var/run/uwsgi8000.pid

### nginx ###

- config nginx configure file

		server {
			listen 80;
			server_name localhost;
			location / {
				uwsgi_pass 127.0.0.1:8000;
				uwsgi_param UWSGI_SCRIPT hello.wsgi;
				uwsgi_param UWSGI_CHDIR /data/hello;
			    include uwsgi_params;
			}
		}

- reload nginx configure file

		nginx -s reload 
		
### supervisor ###
- config supervisor.conf

		[program:travel]
		stopsignal=QUIT
		autostart=true
		autorestart=true
		command=/usr/bin/uwsgi --ini /data/uwsgi/life.ini 
		stdout_logfile=/var/log/supervisor/stdout_travel.log
		stderr_logfile=/var/log/supervisor/stderr_travel.log
		stdout_logfile_maxbytes=10MB
		stdout_logfile_backups=10
		redirect_stderr=true

- supervisorctl command(status,restart..)
