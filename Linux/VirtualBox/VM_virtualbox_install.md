
- install Guest Addition : solve error: "vboxadd-service ... failed!"

	- Login as root;
		
	- Update your APT database with apt-get update;
	
	- Install the latest security updates with apt-get upgrade;

	- Install required packages with apt-get install build-essential module-assistant;
		
	- Configure your system for building kernel modules by running m-a prepare;
	  
	- Click on Install Guest Additions… from the Devices menu, then run mount /media/cdrom.
	  Run sh /media/cdrom/VBoxLinuxAdditions.run, and follow the instructions on screen.
	
	- See more at: http://demo102.phpcaiji.com/article/cjidgh-how-to-fix-virtualbox-startup-error-vboxadd-service-failed.html#sthash.rcpGPWNz.dpuf

- boot guest operate system error after boot host operate system

	- enable cpu all virtualization function in bios

- debian 8 root can't login in debian 8

	* First open a terminal and type su then your root password that you created when installing your Debian 8.

	* Install Leafpad text editor which allows you to edit text files. Type: “apt-get install leafpad”

	* Stay in root terminal and type “leafpad /etc/gdm3/daemon.conf”. This command opens the file “daemon.conf” in leafpad. Under security type “AllowRoot=true”. So your security section in the file should look like this:[security]

	* AllowRoot=trueOnce it looks like this save the file then exit the window.
	Stay in root terminal and type “leafpad /etc/pam.d/gdm-password”. This command opens the file “gdm-password” in leafpad. Within this file you have comment out the line containing “auth required pam_succeed_if.so user != root quiet_success” so that it looks like this `#auth required pam_succeed_if.so user != root quiet_successSave the file and exit.`

	* Now you should be able to login as root in you GUI Debian 8.


