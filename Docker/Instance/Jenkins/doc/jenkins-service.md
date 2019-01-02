# Jenkins Swarm HA Cluster Docker

## create swarm network

	docker network create -d overlay jenkins_master_net

## boot cluster docker

### boot visualizer docker

	docker service create --name visualizer \
		--mount type=bind,source=/var/run/docker.sock,destination=/var/run/docker.sock \
		--constraint 'node.role==manager' \
		--network jenkins_master_net \
		--publish 8000:8080 dockersamples/visualizer:stable
	

### boot jenkins:blueocean-timer docker

#### 正式环境部署

	docker service create --user root --name jenkins_master \
	       --mount type=bind,source=/tmp,destination=/tmp \
	       --mount type=bind,source=/data/jenkins_home,destination=/var/jenkins_home \
	       --constraint 'node.role==worker' --restart-condition='on-failure' \
	       -e JAVA_OPTS='-Duser.timezone=Hongkong -Dhudson.util.ProcessTree.disable=true'  \
	       -e JENKINS_SLAVE_AGENT_PORT=36093 \
	       --network jenkins_master_net \
	       --publish 36093:36093 --publish 8080:8080 \
	       qci.jenkins.sng.local/jenkins:blueocean-timer


  
#### 我的工作环境-战神 (docker-machine)

	docker service create --user root --name jenkins_master \ 
	      --mount type=bind,source=/tmp,destination=/tmp \ 
	      --mount type=volume,source=jenkins_home,destination=/var/jenkins_home \ 
	      --constraint 'node.role==manager' --restart-condition='on-failure' \
	      -e JAVA_OPTS='-Duser.timezone=Hongkong -Dhudson.util.ProcessTree.disable=true' \
	      -e JENKINS_SLAVE_AGENT_PORT=36093 \
	      --network jenkins_master_net \
	      --publish 36093:50000 --publish 8080:8080 \
	      damoncheng/jenkins:blueocean-timer

#### 我的工作环境-Mac

	docker service create --user root --name jenkins_master \
			--mount type=bind,source=/tmp,destination=/tmp \
			--mount type=bind,source=/var/run/docker.sock,destination=/var/run/docker.sock \
			--mount type=bind,source=/Users/jenkins/jenkins_home,destination=/Users/jenkins/jenkins_home \
			--constraint 'node.role==manager' --restart-condition='on-failure' \
			-e JAVA_OPTS='-Duser.timezone=Hongkong -Dhudson.util.ProcessTree.disable=true' \
			-e JENKINS_SLAVE_AGENT_PORT=36093 \
			-e JENKINS_HOME=/Users/jenkins/jenkins_home \
			--network jenkins_master_net \
			--publish 36093:50000 --publish 9001:8080 \
			damoncheng/jenkins:blueocean-timer



### boot rsync and inotify docker

#### 正式部署环境

	docker service create --user root -e "IP_LIST=`cat ip.list`" --name jenkins_master_storage \
          --mount type=bind,source=/tmp,destination=/tmp \
          --mount type=bind,source=/data/jenkins_home,destination=/var/jenkins_home \
          --constraint 'node.role==worker' --mode global --restart-condition='on-failure'\
          --publish 873:873 qci.jenkins.sng.local/jenkins:sync-2

#### 我的工作环境(docker-machine) 挂载jenkins deploy

	docker service create --user root -e "IP_LIST=`cat ip.list`" --name jenkins_master_storage \
	      --mount type=bind,source=/tmp,destination=/tmp \
	      --mount type=volume,source=jenkins_deploy,destination=/jenkins_deploy \
	      --mount type=volume,source=jenkins_home,destination=/var/jenkins_home \
	      --mode global --restart-condition='on-failure' --publish 873:873  \
	      damoncheng/jenkins:sync-v3




