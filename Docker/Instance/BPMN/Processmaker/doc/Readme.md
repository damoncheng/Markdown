# Processmaker BPMN搭建



## boot processmaker docker

### 启动mysql docker

	# 初始化root密码启动mysql docker
	docker run --name some-mysql \
		-e MYSQL_ROOT_PASSWORD=123456 \
		-d mysql

	# 进入mysql container
	docker exec -it mysql bash

	# 更改root 登陆密码
	ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

	# 创建远程访问账号密码
	CREATE USER 'damoncheng'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
	GRANT ALL PRIVILEGES ON *.* TO 'damoncheng'@'%';

### 启动processmaker

	# 连接mysql container启动processmaker docker镜像
	docker run -d \
	    --link some-mysql:mysql \
	    -p 8088:80 \
	    --name some-pkm \
	    eltercera/docker-processmaker
	    
