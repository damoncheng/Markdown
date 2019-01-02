##Python + Celery + Redis配置##

- 安装软件

	python2.7(如果系统没有，可以手动下载官网包安装)
	
	redis(包管理器安装: yum install redis)

	celery（pip安装:pip install celery[redis]）

- 运行redis服务并盐城服务启动

	redis-server redis-server /etc/redis.conf

		在/etc/redis.conf中设置daemonize yes,redis将以守护进程运行

	通过redis-cli进入命令行，然后ping，如果回复PONG，证明redis-server启动

		[-------------]# redis-cli -p 80
		127.0.0.1:80> ping
		PONG
		127.0.0.1:80> 


- celery demo:

	- 目录结构
	
			celery_demo	
			--celery_app
			----__init__.py
			----celeryconfig.py
			----task1.py
			----task2.py
			--client.py

	- 文件内容

		`__init__.py`

		
			from celery import Celery

			app = Celery("demo")
			
			app.config_from_object("celery_app.celeryconfig")

		`celeryconfig.py`

			BROKER_URL = 'redis://127.0.0.1:6379'
			#CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379/0'
			
			CELERY_TIMEZONE='Asia/Shanghai'
			
			CELERY_IMPORTS = (
			
			   'celery_app.task1',
			   'celery_app.task2'
			
			)

		`task1.py`

			import time
			
			from celery_app import app
			
			@app.task
			def add(x,y):
			    time.sleep(2)
			    return x + y

		`task2.py`

			import time
			from celery_app import app
			
			@app.task
			def multiply(x,y):
			    time.sleep(2)
			    return x * y


		`client.py`

			import time
			from celery_app import app
			
			@app.task
			def multiply(x,y):
			    time.sleep(2)
			    return x * y
			[root@TENCENT64 /data/damoncheng/celery_demo]# cat client.py 
			from celery_app import task1
			from celery_app import task2
			
			task1.add.apply_async(args=[2,8])
			task2.multiply.apply_async(args=[3,7])
			
			print "hello world"

- 启动celery worker

	celery -A  celery_app -l info

- 使用celery进行异步调用

	python client.py	

## Django + Celery + Redis + supervisor ##

Celery 4.0 supports Django 1.8 and newer versions. Please use Celery 3.1 for versions older than Django 1.8.

- 指定celery版本安装

	 pip install celery==3.1.18 

- 目录结构

		manage.py 
		--release
		----__init__.py
		----celery.py
		----settings.py
		----...----
		--apps
		----tasks.py
	
- 文件内容

	`__init__.py`

		from release.celery import app as celery_app

	`celery.py`

		#coding:utf-8
		
		from __future__ import absolute_import 
		import os
		from celery import Celery
		from django.conf import settings 
		
		os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'release.settings')
		app = Celery('release')
		
		app.config_from_object('django.conf:settings')
		app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
		
		@app.task(bind=True)
		def debug_task(self):
		    print('Request: {0!r}'.format(self.request))


	`settings.py`

		BROKER_URL = 'redis://domainname:80' 
		CELERY_ACCEPT_CONTENT = ['application/json'] 
		CELERY_TASK_SERIALIZER = 'json' 
		CELERY_TIMEZONE='Asia/Shanghai'

	`tasks.py`

		#coding:utf-8
		from celery.decorators import task
		
		@task(name="sum_two_numbers")
		def add(x,y):
		    return x + y;


- supervisor托管celery worker作为守护进程

		[program:celery]
		; Set full path to celery program if using virtualenv
		command=/usr/local/bin/celery worker -A release --loglevel=INFO
		
		; Alternatively,
		;command=celery --app=your_app.celery:app worker --loglevel=INFO -n worker.%%h
		; Or run a script
		;command=celery.sh
		
		directory=/data/webroot/release_proj
		user=root
		numprocs=1
		stdout_logfile=/data/celery_log/worker_stdout.log
		stderr_logfile=/data/celery_log/worker_stderr.log
		autostart=true
		autorestart=true
		startsecs=10
		
		; Need to wait for currently executing tasks to finish at shutdown.
		; Increase this if you have very long running tasks.
		stopwaitsecs = 600
		
		; Causes supervisor to send the termination signal (SIGTERM) to the whole process group.
		stopasgroup=true
		
		; Set Celery priority higher than default (999)
		; so, if rabbitmq is supervised, it will start first.
		priority=1000


- 调用apps函数

		from apps.tasks import add
		
		add.delay(2,3);