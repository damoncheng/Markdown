# Rabbitmq HA Cluster Docker 

## 定制rabbitmq docker

Docker Hub上`rabbitmq:management`没有包含tracing插件，需要定制DockerFile追加插件:

### enabled_plugins

	[rabbitmq_management, rabbitmq_management_agent, rabbitmq_web_dispatch, rabbitmq_tracing].

### 参数调整

	
Prior to RabbitMQ 3.7.0, RabbitMQ config file was named **rabbitmq.config** and used an 
**Erlang term configuration format**. That format is still supported for backwards 
compatibility. Those running 3.7.0 or later are recommended to consider 
the **new sysctl format**.

	rabbitmq.conf : This includes configuration for the core server as well as plugins.
	
	advanced.conf : Some configuration settings are not possible or are difficult to configure 
	using the sysctl format. As such, it is possible to use an additional config file in the 
	Erlang term format (same as rabbitmq.config). That file is commonly named advanced.config. 
	It will be merged with the configuration provided in rabbitmq.conf.

### DockerFile

	FROM rabbitmq:management

	COPY enabled_plugins /etc/rabbitmq/enabled_plugins
	COPY enabled_plugins /etc/rabbitmq/enabled_plugins
	COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
	COPY advanced.config /etc/rabbitmq/advanced.config
	RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	    echo "Asia/Shanghai" > /etc/timezone

	
## boot rabbitmq docker


### Docker启动参数详解

	-h FQDN : 定义container的hostname， 标识一个node
	
	--name rabbit : 定义container的名字
	
	-p : map the container ports to the host.
	
	-e : 追加环境变量到container。 
	
		RABBITMQ_USE_LONGNAME=true ： 标志每个节点通过FQDN方式和其他节点交流。

		RABBITMQ_LOGS=/var/log/rabbitmq/rabbit.log : 设置所有的日志输出到该文件，不输入到标准输出。

	-v ：映射host目录到container。Rabbitmq将所有数据保存在`/var/lib/rabbitmq`目录里面, 将相关数据收拢到一个指定目录进行管理。


### 正式环境启动rabbitmq docker

	docker run -d -h (master FQDN)                                  \
	       --name rabbit                                            \
           -p "4369:4369"                                           \
           -p "5672:5672"                                           \
           -p "15672:15672"                                         \
           -p "25672:25672"                                         \
           -p "35197:35197"                                         \
           -e "RABBITMQ_USE_LONGNAME=true"                          \
           -e "RABBITMQ_LOGS=/var/log/rabbitmq/rabbit.log"          \
           -v /data/rabbitmq:/var/lib/rabbitmq \
           -v /data/rabbitmq/logs:/var/log/rabbitmq \
           -v /data/rabbitmq/tracing:/var/tmp/rabbitmq-tracing \
           repertory/damoncheng/rabbitmq:management
	   
	   
	 docker run -d -h (mirrored FQDN)                                  \
	       --name rabbit                                            \
           -p "4369:4369"                                           \
           -p "5672:5672"                                           \
           -p "15672:15672"                                         \
           -p "25672:25672"                                         \
           -p "35197:35197"                                         \
           -e "RABBITMQ_USE_LONGNAME=true"                          \
           -e "RABBITMQ_LOGS=/var/log/rabbitmq/rabbit.log"          \
           -v /data/rabbitmq:/var/lib/rabbitmq \
           -v /data/rabbitmq/logs:/var/log/rabbitmq \
           -v /data/rabbitmq/tracing:/var/tmp/rabbitmq-tracing \
           repertory/damoncheng/rabbitmq:management
		

### 工作环境启动rabbitmq docker

	#mirror环境
	docker run -d -h (mirror FQDN)                             \
	       --name rabbit                                            \
	       -p "4369:4369"                                           \
	       -p "5672:5672"                                           \
	       -p "15672:15672"                                         \
	       -p "25672:25672"                                         \
	       -p "35197:35197"                                         \
	       -e "RABBITMQ_USE_LONGNAME=true"                          \
	       -e "RABBITMQ_LOGS=/var/log/rabbitmq/rabbit.log"          \
	       -v /Users/jenkins/rabbitmq:/var/lib/rabbitmq \
	       -v /Users/jenkins/rabbitmq/logs:/var/log/rabbitmq \
	        -v /Users/jenkins/rabbitmq/tracing:/var/tmp/rabbitmq-tracing \
	        damoncheng/rabbitmq:management
	
	
	#master环境
	docker run -d -h (master FQDN)                             \
	       --name rabbit                                            \
           -p "4369:4369"                                           \
           -p "5672:5672"                                           \
           -p "15672:15672"                                         \
           -p "25672:25672"                                         \
           -p "35197:35197"                                         \
	       -e "RABBITMQ_USE_LONGNAME=true"                          \
           -e "RABBITMQ_LOGS=/var/log/rabbitmq/rabbit.log"          \
           -v /mnt/sda1/rabbitmq:/var/lib/rabbitmq \
           -v /mnt/sda1/rabbitmq/logs:/var/log/rabbitmq \
	        -v /mnt/sda1/rabbitmq/tracing:/var/tmp/rabbitmq-tracing \
	        damoncheng/rabbitmq:management
	

## 搭建HA配置

### Queue mirroring

	在RabbitMQ集群内，默认队列仅仅被声明在单节点（the node on which they were first declared）。理解这点事非常重要的。

	Each mirrored queue consists of one master and one or more mirrors. 
		
	Messages published to the queue are replicated to all mirrors. 
	Consumers are connected to the master regardless of which node they connect to.
	
	If the node hosts queue master fails, 
	the oldest mirror will be promoted to the new master as long as it synchronised. 
	Unsynchronised mirrors can be promoted, too, depending on queue mirroring parameters.

	
### Erlang Cookie

每个RabbitMQ节点有一个 `.erlang.cookie` 文件在数据目录内，这个文件包含一个secret（some sort of random hash）。 当这个文件不存在时，会自动的被创建。 这个文件被判断节点间是否能够交流，只有这个文件内容相同的节点，才能相互交流。复制第一个节点的`.erlang.cookie`到其他节点，重启其他节点的container, 节点间就能实现交流。


### docker 命令配置

- 删除guest user

		docker exec rabbit rabbitmqctl delete_user guest
		
- 创建virtual host `/`

		docker exec rabbit rabbitmqctl add_vhost /
		
- 创建Users

		# Admin user
		docker exec rabbit rabbitmqctl add_user admin password
		docker exec rabbit rabbitmqctl set_user_tags admin administrator
		
		# Application user
		docker exec rabbit rabbitmqctl add_user guest password		docker exec rabbit rabbitmqctl set_permissions -p / guest "" "" ".*"
		
- 创建cluster(在mirroed运行即可)

		docker exec rabbit rabbitmqctl stop_app
		docker exec rabbit rabbitmqctl join_cluster rabbit@(master FQDN)
		docker exec rabbit rabbitmqctl start_app
		
- 设置策略，启动mirroed模式

		docker exec rabbit rabbitmqctl set_policy ha "." '{"ha-mode":"all"}'
		
		其中设定策略名为`ha`, `.`标志所有队列高可用，`{"ha-mode" : "all"}`标志所有节点加入。

