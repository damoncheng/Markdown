
default:	build

clean:
	rm -rf Makefile objs

build:
	$(MAKE) -f objs/Makefile

install:
	$(MAKE) -f objs/Makefile install

modules:
	$(MAKE) -f objs/Makefile modules

upgrade:
	/opt/openresty/nginx/sbin/nginx -t

	kill -USR2 `cat /opt/openresty/nginx/logs/nginx.pid`
	sleep 1
	test -f /opt/openresty/nginx/logs/nginx.pid.oldbin

	kill -QUIT `cat /opt/openresty/nginx/logs/nginx.pid.oldbin`
