## Orientation ##

- List Docker CLI commands

        docker
        docker container --help
        
- Display Docker version and info

        docker --version
        docker version
        docker info
        
- Excecute Docker image

        docker run hello-world
        
- List Docker images

        docker image ls
       
- List Docker containers(running, all, all in quiet mode)

        docker container ls
        docker container ls -all
        docker container ls -a -q

## Container ##

- Build the app

<<<<<<< HEAD
        docker build -t friendlyhello .
=======
        docker build -t friendlyhello
>>>>>>> e716d412483f1f685897cffdaef0dd4797a74a2e
       
- Run the app

        docker run -p 4000:80 friendlyhello
        
- Log in with your Docker ID

        docker login
       
- Tag the image

        docker tag image username/repository:tag
        
    For example:
        
        docker tag friendlyhello john/get-started:part2
        
- Publish the image

    upload your tagged image to the repository
        
        docker push username/repository:tag
        
        
- pull and run the image from the remote repository

        docker run -p 4000:80 username/repository:tag
        
        
- a list of the basic Docker command

        docker build -t friendlyhello .  # Create image using this directory's Dockerfile
        docker run -p 4000:80 friendlyhello  # Run "friendlyname" mapping port 4000 to 80
        docker run -d -p 4000:80 friendlyhello         # Same thing, but in detached mode
        docker container ls                                # List all running containers
        docker container ls -a             # List all containers, even those not running
        docker container stop <hash>           # Gracefully stop the specified container
        docker container kill <hash>         # Force shutdown of the specified container
        docker container rm <hash>        # Remove specified container from this machine
        docker container rm $(docker container ls -a -q)         # Remove all containers
        docker image ls -a                             # List all images on this machine
        docker image rm <image id>            # Remove specified image from this machine
        docker image rm $(docker image ls -a -q)   # Remove all images from this machine
        docker login             # Log in this CLI session using your Docker credentials
        docker tag <image> username/repository:tag  # Tag <image> for upload to registry
        docker push username/repository:tag            # Upload tagged image to registry
        docker run username/repository:tag                   # Run image from a registry
        
## Services ##

In part 3, we scale our application and enable load-balancing. To do this, we must go one level up in the hierarchy of a distributed application: the service.

- pip install docker-compose, and create a docker-compose.yml

        version: "3"
        services:
          web:
            # replace username/repo:tag with your name and image details
            image: username/repo:tag
            deploy:
              replicas: 5
              resources:
                limits:
                  cpus: "0.1"
                  memory: 50M
              restart_policy:
                condition: on-failure
            ports:
              - "80:80"
            networks:
              - webnet
        networks:
          webnet:


- create swarm manager

        docker swarm init
       
- run app in swarm, and give app a name

        docker stack deploy -c docker-compose.yml getstartedlab

- verify

        curl -4 http://127.0.0.1 (here will fail if use localhost, I don't know why it happen)
        
- Scale the app

        You can scale the app by changing the replicas value in docker-compose.yml, saving the change, and re-running the docker stack deploy command:
        
        docker stack deploy -c docker-compose.yml getstartedlab
        
- Take down the app and the swarm

        docker stack rm getstartedlab
        
- Take down the swarm

        docker swarm leave --force
        
- Some commands to explore at this stage:

        docker stack ls                                            #                        List stacks or apps
        # Run the specified Compose file
        docker stack deploy -c <composefile> <appname>  
        
        # List running services
        docker service ls                  associated with an app
        
        # List tasks associated with an app
        docker service ps <service>                  
        
        # Inspect task or container
        docker inspect <task or container>                   
        
        # List container IDs
        docker container ls -q                                      
        
        # Tear down an application
        docker stack rm <appname>                             
        
        # Take down a single node swarm from the manager
        docker swarm leave --force      
        
## Swarms ##     

Here in part4, you deploy this application onto a cluster, running it on multiple machines. Multi-container, multi-machine applications are made possible by joining multiple machines into "Dockerized" cluster called a **swarm**.

#### Understanding Swarm cluster ####

A swarm is a group of machines that are running Docker and joined into a cluster. After that has happened, you continue to run the Docker commands you’re used to, but now they are executed on a cluster by a **swarm manager**. The machines in a swarm can be physical or virtual. After joining a swarm, they are referred to as **nodes**.

Swarm managers can use several strategies to run containers, such as “emptiest node” – which fills the least utilized machines with containers. Or “global”, which ensures that each machine gets exactly one instance of the specified container. You instruct the swarm manager to use these strategies in the Compose file, just like the one you have already been using.

Swarm managers are the only machines in a swarm that can execute your commands, or authorize other machines to join the swarm as **workers**. Workers are just there to provide capacity and do not have the authority to tell any other machine what it can and cannot do.

Up until now, you have been using Docker in a single-host mode on your local machine. But Docker also can be switched into **swarm mode**, and that’s what enables the use of swarms. Enabling swarm mode instantly makes the current machine a swarm manager. From then on, Docker runs the commands you execute on the swarm you’re managing, rather than just on the current machine.

#### Set up your swarm ####

<<<<<<< HEAD


- create two virtual machine

        docker-machine create --driver virtualbox myvm1
        docker-machine create --driver virtualbox myvm2

- initialize the swarm and add nodes

    - myvim1 init manager

            $ docker-machine ssh myvm1 "docker swarm init --advertise-addr <myvm1 ip>"
            Swarm initialized: current node <node ID> is now a manager.
            
            To add a worker to this swarm, run the following command:
            
              docker swarm join \
              --token <token> \
              <myvm ip>:<port>
            
            To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
            
    - myvm2 join manager
    
            $ docker-machine ssh myvm2 "docker swarm join \
            --token <token> \
            <ip>:2377"
            
            This node joined a swarm as a worker.
         
    - docker node ls on the manager to view the nodes in this swarm
    
            $ docker-machine ssh myvm1 "docker node ls"
            ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS
            brtu9urxwfd5j0zrmkubhpkbd     myvm2               Ready               Active
            rihwohkh3ph38fhillhhb84sk *   myvm1               Ready               Active              Leader        
        
#### Deploy your app on the swarm cluster ####

Run docker-machine env myvm1 to get the command to configure your shell to talk to myvm1

        $ docker-machine env myvm1
        export DOCKER_TLS_VERIFY="1"
        export DOCKER_HOST="tcp://192.168.99.100:2376"
        export DOCKER_CERT_PATH="/Users/sam/.docker/machine/machines/myvm1"
        export DOCKER_MACHINE_NAME="myvm1"
        # Run this command to configure your shell:
        # eval $(docker-machine env myvm1)
        
Run the given command to configure your shell to talk to myvm1.

        $ eval $(docker-machine env myvm1)
        
Run docker-machine ls to verify that myvm1 is now the active machine, as indicated by the asterisk next to it.

        $ docker-machine ls
        NAME    ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER        ERRORS
        myvm1   *        virtualbox   Running   tcp://192.168.99.100:2376           v17.06.2-ce   
        myvm2   -        virtualbox   Running   tcp://192.168.99.101:2376           v17.06.2-ce   
        
#### Deploy the app on the swarm manager ####

- stack deplay app
       
       $ docker stack deploy -c docker-compose.yml getstartedlab
    
- Note:
    
    If your image is stored on a private registry instead of Docker Hub, you need to be logged in using 
    docker login <your-registry> and then you need to add the --with-registry-auth flag to the above 
    command. For example:
    
            docker login registry.example.com
        
            docker stack deploy --with-registry-auth -c docker-compose-yml getstartedlab
        
- list tasks in stack
 
        $ docker stack ps getstartedlab
        
#### Iterating and scaling your app ####

- Scale the app by changing the `docker-compose.yml` file.

- Change the app behavior by editing code, then rebuild, and push the new image. (To do this, follow the same steps you took earlier to build the app and publish the image).

- In either case, simply run docker stack deploy again to deploy these changes.

- You can join any machine, physical or virtual, to this swarm, using the same `docker swarm join` command you used on `myvm2`, and capacity is added to your cluster. Just run `docker stack deploy` afterwards, and your app can take advantage of the new resources.

#### Cleanup and reboot ####

- You can tear down the stack with docker stack rm. For example:

        docker stack rm getstartedlab
        
- Unsetting docker-machine shell variable settings

        eval $(docker-machine env -u)

#### a list of the basic Docker command ####

        docker-machine create --driver virtualbox myvm1 # Create a VM (Mac, Win7, Linux)
        docker-machine create -d hyperv --hyperv-virtual-switch "myswitch" myvm1 # Win10
        docker-machine env myvm1                # View basic information about your node
        docker-machine ssh myvm1 "docker node ls"         # List the nodes in your swarm
        docker-machine ssh myvm1 "docker node inspect <node ID>"        # Inspect a node
        docker-machine ssh myvm1 "docker swarm join-token -q worker"   # View join token
        docker-machine ssh myvm1   # Open an SSH session with the VM; type "exit" to end
        docker node ls                # View nodes in swarm (while logged on to manager)
        docker-machine ssh myvm2 "docker swarm leave"  # Make the worker leave the swarm
        docker-machine ssh myvm1 "docker swarm leave -f" # Make master leave, kill swarm
        docker-machine ls # list VMs, asterisk shows which VM this shell is talking to
        docker-machine start myvm1            # Start a VM that is currently not running
        docker-machine env myvm1      # show environment variables and command for myvm1
        eval $(docker-machine env myvm1)         # Mac command to connect shell to myvm1
        & "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env myvm1 | Invoke-Expression   # Windows command to connect shell to myvm1
        docker stack deploy -c <file> <app>  # Deploy an app; command shell must be set to talk to manager (myvm1), uses local Compose file
        docker-machine scp docker-compose.yml myvm1:~ # Copy file to node's home dir (only required if you use ssh to connect to manager and deploy the app)
        docker-machine ssh myvm1 "docker stack deploy -c <file> <app>"   # Deploy an app using ssh (you must have first copied the Compose file to myvm1)
        eval $(docker-machine env -u)     # Disconnect shell from VMs, use native docker
        docker-machine stop $(docker-machine ls -q)               # Stop all running VMs
        docker-machine rm $(docker-machine ls -q) # Delete all VMs and their disk images
        
        
#### 当增加node到swarm的时候，manager强制负载均衡 ####

docker service update --force $SERVICE_NAME

        
## Stack ##
        
#### Add a new service and redeploy ####

- Edit docker-compose.yml

        version: "3"
        services:
          web:
            # replace username/repo:tag with your name and image details
            image: username/repo:tag
            deploy:
              replicas: 5
              restart_policy:
                condition: on-failure
              resources:
                limits:
                  cpus: "0.1"
                  memory: 50M
            ports:
              - "80:80"
            networks:
              - webnet
          visualizer:
            image: dockersamples/visualizer:stable
            ports:
              - "8080:8080"
            volumes:
              - "/var/run/docker.sock:/var/run/docker.sock"
            deploy:
              placement:
                constraints: [node.role == manager]
            networks:
              - webnet
        networks:
          webnet:
          
- Make sure your shell is configured to talk to myvm1

    - Run docker-machine ls to list machines and make sure you are connected to myvm1, as indicated by an asterisk next it.
    - If needed, re-run docker-machine env myvm1, then run the given command to configure the shell.
    
                eval $(docker-machine env myvm1)
                
- Re-run the `docker stack deploy` command on the manager, and whatever services need updating are updated:

        $ docker stack deploy -c docker-compose.yml getstartedlab
        Updating service getstartedlab_web (id: angi1bf5e4to03qu9f93trnxm)
        Creating service getstartedlab_visualizer (id: l9mnwkeq2jiononb5ihz9u7a4)
      
  
#### Persist the data ####

let’s go through the same workflow once more to add a Redis database for storing app data.

- Save this new `docker-compose.yml` file, which finally adds a Redis service. Be sure to replace username/repo:tag with your image details

            version: "3"
            services:
              web:
                # replace username/repo:tag with your name and image details
                image: username/repo:tag
                deploy:
                  replicas: 5
                  restart_policy:
                    condition: on-failure
                  resources:
                    limits:
                      cpus: "0.1"
                      memory: 50M
                ports:
                  - "80:80"
                networks:
                  - webnet
              visualizer:
                image: dockersamples/visualizer:stable
                ports:
                  - "8080:8080"
                volumes:
                  - "/var/run/docker.sock:/var/run/docker.sock"
                deploy:
                  placement:
                    constraints: [node.role == manager]
                networks:
                  - webnet
              redis:
                image: redis
                ports:
                  - "6379:6379"
                volumes:
                  - "/home/docker/data:/data"
                deploy:
                  placement:
                    constraints: [node.role == manager]
                command: redis-server --appendonly yes
                networks:
                  - webnet
            networks:
              webnet:
    

- Most importantly, there are a couple of things in the redis specification that make data persist between deployments of this stack:

    - redis always runs on the manager, so it’s always using the same filesystem.
    - redis accesses an arbitrary directory in the host’s file system as /data inside the container, which is where Redis stores data.
    
    Together, this is creating a “source of truth” in your host’s physical filesystem for the Redis data. Without this, Redis would store its data in /data inside the container’s filesystem, which would get wiped out if that container were ever redeployed
   
- Create a ./data directory on the manager:

    - The placement constraint you put on the Redis service, ensuring that it always uses the same host.
    - The volume you created that lets the container access ./data (on the host) as /data (inside the Redis container). While containers come and go, the files stored on ./data on the specified host persists, enabling continuity.
   
        **docker-machine ssh myvm1 "mkdir ./data"**
        
- Make sure your shell is configured to talk to **myvm1** (full examples are here).

    - Run `docker-machine ls to list` machines and make sure you are connected to myvm1, as indicated by an asterisk next it.
    
    - If needed, re-run `docker-machine env myvm1`, then run the given command to configure the shell.
    
        On Mac or Linux the command is:
        
                eval $(docker-machine env myvm1)
                
        On Windows the command is:
        
                & "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env myvm1 | Invoke-Expression


- Run **docker stack deploy** one more time.

            $ docker stack deploy -c docker-compose.yml getstartedlab
            
=======
- make your current machine a swarm manager

        docker swarm init

- other machines to have them join the swarm as workers
>>>>>>> e716d412483f1f685897cffdaef0dd4797a74a2e

