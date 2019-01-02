## Install Docker Machine ##

#### MacOS ####

        $ curl -L https://github.com/docker/machine/releases/download/v0.13.0/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine && \
          chmod +x /usr/local/bin/docker-machine
          
#### Linux ####

        $ curl -L https://github.com/docker/machine/releases/download/v0.13.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine && \
        sudo install /tmp/docker-machine /usr/local/bin/docker-machine
        
#### Windows ####

        $ if [[ ! -d "$HOME/bin" ]]; then mkdir -p "$HOME/bin"; fi && \
        curl -L https://github.com/docker/machine/releases/download/v0.13.0/docker-machine-Windows-x86_64.exe > "$HOME/bin/docker-machine.exe" && \
        chmod +x "$HOME/bin/docker-machine.exe"
        


$ docker-machine version

        docker-machine version 0.13.0, build 9371605
        
        
## How to uninstall Docker Machine ##

- Remove the executable: rm $(which docker-machine)

- Optionally, remove the machines you created.

            To remove each machine individually: docker-machine rm <machine-name>
            
            To remove all machines: docker-machine rm -f $(docker-machine ls -q) (you might need to use -force on Windows)
            
Removing machines is an optional step because there are cases where you might want to save and migrate existing machines to a Docker for Mac or Docker for Windows environment, for example.

Note: As a point of information, the config.json, certificates, and other data related to each virtual machine created by docker-machine is stored in ~/.docker/machine/machines/ on Mac and Linux and in ~\.docker\machine\machines\ on Windows. We recommend that you do not edit or remove those files directly as this only affects information for the Docker CLI, not the actual VMs, regardless of whether they are local or on remote servers.

## Install Virtualbox ##

        apt-get install virtualbox
        
## Use Machine to run Docker containers ##

- create a new (or start an existing) Docker virtual machine.
- switch your environment to your new VM.
- use the docker client to create, load, and manage containers.

#### Create a machine ####

- list machine

        docker-machine ls
        
- create machine

        docker-machine create --driver virtualbox default
        
- Get the environment commands for your new VM.

        $ docker-machine env default
         export DOCKER_TLS_VERIFY="1"
         export DOCKER_HOST="tcp://172.16.62.130:2376"
         export DOCKER_CERT_PATH="/Users/<yourusername>/.docker/machine/machines/default"
         export DOCKER_MACHINE_NAME="default"
         # Run this command to configure your shell:
         # eval "$(docker-machine env default)" 
         
- Connect your shell to the new machine.

        $ eval "$(docker-machine env default)"
        
#### Run containers and experiment with Machine commands ####

- Use docker run to download and run busybox with a simple ‘echo’ command.

        $ docker run busybox echo hello world
         Unable to find image 'busybox' locally
         Pulling repository busybox
         e72ac664f4f0: Download complete
         511136ea3c5a: Download complete
         df7546f9f060: Download complete
         e433a6c5b276: Download complete
         hello world
         
- Get the host IP address.

        $ docker-machine ip default
         192.168.99.100
         
- Run a Nginx webserver in a container with the following command:

        $ docker run -d -p 8000:80 nginx
        
        $ curl $(docker-machine ip default):8000
         <!DOCTYPE html>
         <html>
         <head>
         <title>Welcome to nginx!</title>
         <style>
             body {
                 width: 35em;
                 margin: 0 auto;
                 font-family: Tahoma, Verdana, Arial, sans-serif;
             }
         </style>
         </head>
         <body>
         <h1>Welcome to nginx!</h1>
         <p>If you see this page, the nginx web server is successfully installed and
         working. Further configuration is required.</p>
    
         <p>For online documentation and support, refer to
         <a href="http://nginx.org/">nginx.org</a>.<br/>
         Commercial support is available at
         <a href="http://nginx.com/">nginx.com</a>.</p>
    
         <p><em>Thank you for using nginx.</em></p>
         </body>
         </html>
         
#### Start and stop machines ####

        $ docker-machine stop default
        $ docker-machine start default
        
#### Unset environment variables in the current shell ####

- Run env|grep DOCKER to check whether DOCKER environment variables are set.

        $ env | grep DOCKER
        DOCKER_HOST=tcp://192.168.99.100:2376
        DOCKER_MACHINE_NAME=default
        DOCKER_TLS_VERIFY=1
        DOCKER_CERT_PATH=/Users/victoriabialas/.docker/machine/machines/default
        
    If it returns output (as shown in the example), you can unset the DOCKER environment variables.
    
- Use one of two methods to unset DOCKER environment variables in the current shell.

    - Run the unset command on the following DOCKER environment variables.
    
                unset DOCKER_TLS_VERIFY
                unset DOCKER_CERT_PATH
                unset DOCKER_MACHINE_NAME
                unset DOCKER_HOST
            
    - Alternatively, run a shortcut command docker-machine env -u to show the command you need to run to unset all DOCKER variables:
    
                $ docker-machine env -u
                unset DOCKER_TLS_VERIFY
                unset DOCKER_HOST
                unset DOCKER_CERT_PATH
                unset DOCKER_MACHINE_NAME
                # Run this command to configure your shell:
                # eval $(docker-machine env -u)

        Run eval $(docker-machine env -u) to unset all DOCKER variables in the current shell.
        
    - Now, after running either of the above commands, this command should return no output.

                $ env | grep DOCKER
                

## Start local machines on startup ##

To ensure that the Docker client is automatically configured at the start of each shell session, you can embed `eval $(docker-machine env default)` in your shell profiles, by adding it to the `~/.bash_profile` file or the equivalent configuration file for your shell. However, this fails if a machine called `default` is not running. You can configure your system to start the `default` machine automatically. The following example shows how to do this in macOS.

Create a file called `com.docker.machine.default.plist` in the `~/Library/LaunchAgents/` directory, with the following content:

        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
            <dict>
                <key>EnvironmentVariables</key>
                <dict>
                    <key>PATH</key>
                    <string>/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin</string>
                </dict>
                <key>Label</key>
                <string>com.docker.machine.default</string>
                <key>ProgramArguments</key>
                <array>
                    <string>/usr/local/bin/docker-machine</string>
                    <string>start</string>
                    <string>default</string>
                </array>
                <key>RunAtLoad</key>
                <true/>
            </dict>
        </plist>
        
You can change the default string above to make this LaunchAgent start a different machine.


        
