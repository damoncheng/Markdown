# Unix Service #

## Keywords ##

System boot, Initscripts, SSH, Telnet, Rights, Permissions, 
Supervision, Ineted, Cron, Backup, Hotplug, PCMCIA, APM, ACPI.

## End ##


This Charapter covers a number of basic services that are common to many Unix systems. All administrators should be familiar with them.


## Systemd ##

systemd is a system and service manager for Linux. systemd is compatible with SysV and LSB init scripts. It can work as a drop-in replacement for sysvinit. Systemd 

- Provide aggresive parallezation capabilities.
- Uses socket and D-Bus activation for starting services.
- offers on-demand starting of daemons
- Implements transactional dependency-based service control logic.
- Tracks processes using Linux cgroups.
- Supports snapshotting and restoring.
- Maintains mount and automount points.

**systemctl** is the main tool used to introspect and control the state of the "systemd" system and service manager. You can use systemctl for instance to **enable/disable services permanently** or **only for the current session**. Refer to the **systemctl(1)** manpage for more details.

- List all running services

        systemctl
        

- Activates the service "example1" immediatly

        systemctl start example1
  
  
- Deactivates the service "example1" immediately: 

        systemctl stop example1
        
- Restarts the service "example1" immediately: 

        systemctl restart example1

- Shows status of the service "example1": 

        systemctl status example1
        
- Enables "example1" to be started on bootup: 

        systemctl enable example1

- Disables "example1" to not start during bootup: 

        systemctl disable example1
        

### Debug ###

Sometimes it is necessary to investigate why systemd hangs on startup or on reboot/shutdown.

Solution #0: Remove "quiet" from Kernel command line (so called "cmdline" or "grub line") 

Solution #1: Increase verbosity via cmdline: Add "systemd.log_target=kmsg systemd.log_level=debug" 

        Of course you can have a "temporary" persistent solution:
        
            [ /etc/default/grub ]
            GRUB_CMDLINE_LINUX="systemd.log_target=kmsg systemd.log_level=debug" <--- Add here (by uncommenting you can easily switch to debug)
            
            # update-grub 
            
Solution #2: Increase verbosity via /etc/systemd/system.conf 

        LogLevel=debug           <--- Uncomment this line and use "debug" (default: commented and "info")
        LogTarget=syslog-or-kmsg <--- Uncomment this line (default: commented)
        
Solution #3: Boot an emergency shell: Add systemd.unit=rescue.target or just 1 (the number one) to the kernel command line. 

Solution #4: Enable the debug shell: Run **systemctl enable debug-shell.service**. (You can do this in a chroot environment after booting a rescue system.) This starts a root shell on TTY 9. 



## System Boot ##

When you boot the computer, the many messages scrolling by on the console display many
automatic initializations and configurations that are being executed. Sometimes you may wish
to slightly alter how this stage works, which means that you need to understand it well. That is
the purpose of this section.

### Important : Boot process ###
First, the BIOS takes control of the computer, detects the disks, loads the Master Boot Record,
and executes the bootloader. The bootloader takes over, finds the kernel on the disk, loads
and executes it. The kernel is then initialized, and starts to search for and mount the partition
containing the root filesystem, and finally executes the first program — init . Frequently, this
“root partition” and this init are, in fact, located in a virtual filesystem that only exists in
RAM (hence its name, “initramfs”, formerly called “initrd” for “initialization RAM disk”). This
filesystem is loaded in memory by the bootloader, often from a file on a hard drive or from the
network. It contains the bare minimum required by the kernel to load the “true” root filesystem:
this may be driver modules for the hard drive, or other devices without which the system can
not boot, or, more frequently, initialization scripts and modules for assembling RAID arrays,
opening encrypted partitions, activating LVM volumes, etc. Once the root partition is mounted,
the initramfs hands over control to the real init, and the machine goes back to the standard boot
process.

### Booting from the netwrok ###
In some configurations, the BIOS may be configured not to execute the MBR,
but to seek its equivalent on the network, making it possible to build comput-
ers without a hard drive, or which are completely reinstalled on each boot.
This option is not available on all hardware and it generally requires an ap-
propriate combination of BIOS and network card.
Booting from the network can be used to launch the debian-installer or FAI
(see Section 4.1, “Installation Methods” (page 50)).


### The progress, a pgrograme instance ###
A process is the representation in memory of a running program. It includes all
of the information necessary for the proper execution of the soware (the code
itself, but also the data that it has in memory, the list of files that it has opened,
the network connections it has established, etc.). A single program may be
instantiated into several processes, not necessarily running under different
user IDs.
### EDN ###


Init executes several processes, following instructions from the **/etc/inittab** file. The first
program that is executed (which corresponds to the sysinit step) is **/etc/init.d/rcS**, a script
that executes all of the programs in the **/etc/rcS.d/** directory.


Among these, you will find successively programs in charge of:

- configuring the console's keyboard

- loading drivers: most of the kernel modules are loaded by the kernel itself as the hardware is detected. **extra drivers are then loaded automatically when the corresponding modules
are listed in /etc/modules**;

- checking the integrity of filesystems;

- mounting local partitions;

- configuring the network;

- mountting netwrok fileysystmes(NFS)

### Using a shell as init to gain root rights ###
By convention, the first process that is booted is the init program. However,
it is possible to pass an init option to the kernel indicating a different program.


Any person who is able to access the computer can press the **Reset** button,
and thus reboot it. Then, at the bootloader's prompt, it is possible to pass
the **init=/bin/sh** option to the kernel to gain root access without knowing the
administrator's password.


To prevent this, you can protect the bootloader itself with a password. You
might also think about protecting access to the BIOS (a password protection
mechanism is almost always available), without which a malicious intruder
could still boot the machine on a removable media containing its own Linux
system, which they could then use to access data on the computer's hard
drives.

Finally, be aware that most BIOS have a generic password available. Initially
intended for troubleshooting for those who have forgoen their password,
these passwords are now public and available on the Internet (see for yourself
by searching for “generic BIOS passwords” in a search engine). All of these
protections will thus impede unauthorized access to the machine without be-
ing able to completely prevent it. There's no reliable way to protect a computer
if the aacker can physically access it; they could dismount the hard drives
to connect them to a computer under their own control anyway, or even steal
the entire machine, or erase the BIOS memory to reset the password...
### end ###


### Kernel modules and options ###
Kernel modules also have options that can be configured by putting some files
in **/etc/modprobe.d/**. These options are defined with directives like this: **opti
ons module-name option-name=option-value.** Several options can be specified
with a single directive if necessary.
These configuration files are intended for **modprobe** — the program that loads a
kernel module with its dependencies (modules can indeed call other modules).
This program is provided by the **module-init-tools** package.
### end ###

After this stage, **init** takes over and starts the programs enabled in the default runlevel (which
is usually runlevel 2). It executes **/etc/init.d/rc 2**, a script that starts all services which are
listed in /etc/rc2.d/ and whose name start with the “S” letter. **The two-figures number that
follows had historically been used to define the order in which services had to be started.** In
Squeeze, the default boot system uses **insserv**, which schedules everything automatically based
on the scripts' dependencies. Each boot script thus declares the conditions that must be met
to start or stop the service (for example, if it must start before or after another service); init
then launches them in the order that meets these conditions. The static numbering of scripts is
therefore no longer taken into consideration (but they must always have a name beginning with
“S” followed by two characters and the actual name of the script used for the dependencies).
Generally, base services (such as logging with rsyslog , or port assignment with portmap ) are
started first, followed by standard services and the graphical interface (gdm).

This dependency-based boot system makes it possible to automate re-numbering, which could
be rather tedious if it had to be done manually, and it limits the risks of human error, since
scheduling is conducted according to the parameters that are indicated. Another benefit is that
services can be started in parallel when they are independent from one another, which can
accelerate the boot process.


### Other boot systems ###
This book describes the boot system used by default in Debian (as imple-
mented by sysvinit package), which is derived and inherited from System V
Unix systems, but there are others.

In the original System V, and in versions of Debian up to Lenny, the execution
order of initialization scripts was defined only by the names of the /etc/rc*.
d/S* symbolic links (and **/etc/rc*.d/K*** upon shutdown). This behavior can
be re-established by setting CONCURRENCY=none in the /etc/default/rcS
file.


file-rc is another boot system with a very simple process. It keeps the principle
of runlevels, but replaces the directories and symbolic links with a configura-
tion file, which indicates to init the processes that must be started and their
launch order

The newly arrived upstart system is still not perfectly tested on Debian. It
is event based: init scripts are no longer executed in a sequential order but in
response to events such as the completion of another script upon which they
are dependent. This system, started by Ubuntu, is present in Debian Squeeze,
but is not the default; it comes, in fact, as a replacement for sysvinit, and one
of the tasks launched by upstart is to launch the scripts wrien for traditional
systems, especially those from the sysv-rc package.


Another new option is **systemd**, but it still lacks the maturity needed to be
part of Squeeze. Its approach is opposite to the previous systems; instead of
preemptively launching all services, and having to deal with the question of
scheduling, systemd chooses to start services on demand, somewhat along the
principle of inetd . But this means that the boot system must be able to know
how services are made available (it could be through a socket, a filesystem, or
others), and thus requires small modifications of those services.
There are also other systems and other operating modes, such as runit , minit ,
or initng , but they are relatively specialized and not widespread.


**init** distinguishes several runlevels, so it can switch from one to another with the **telinit
new-level** command. Immediately, init executes **/etc/init.d/rc** again with the new run-
level. This script will then start the missing services and stop those that are no longer desired.
To do this, it refers to the content of the /etc/rc X .d (where X represents the new runlevel).
Scripts starting with “S” (as in “Start”) are services to be started; those starting with “K” (as
in “Kill”) are the services to be stopped. The script does not start any service that was already
active in the previous runlevel.


By default, Debian uses four different runlevels:

- Level 0 is only used temporarily, while the computer is powering down. As such, it only
contains many “K” scripts.

- Level 1, also known as single-user mode, corresponds to the system in degraded mode; it
includes only basic services, and is intended for maintenance operations where interac-
tions with ordinary users are not desired.

- Level 2 is the level for normal operation, which includes networking services, a graphical
interface, user logins, etc.

- Level 6 is similar to level 0, except that it is used during the shutdown phase that precedes
a reboot.

Other levels exist, especially 3 to 5. By default they are configured to operate the same way as
level 2, but the administrator can modify them (by adding or deleting scripts in the correspond-
ing /etc/rc X .d directories) to adapt them to particular needs.
![](./images/boot_sequence_of_a_computer_running_linux.png)

All the scripts contained in the various **/etc/rcX.d** directories are really **only symbolic links** —created upon package installation by the **update-rc.d** program — pointing to the actual scripts
which are stored in **/etc/init.d/**. The administrator can fine tune the services available in
each runlevel by re-running update-rc.d with adjusted parameters. The update-rc.d(1) man-
ual page describes the syntax in detail. Please note that removing all symbolic links (with the
remove parameter) is not a good method to disable a service. Instead you should simply config-
ure it to not start in the desired runlevel (while preserving the corresponding calls to stop it in
the event that the service runs in the previous runlevel). Since update-rc.d has a somewhat
convoluted interface, you may prefer using **rcconf** (from the rcconf package) which provides a
more user-friendly interface.


#### Restarting services ####
The maintainer scripts for Debian packages will sometimes restart certain
services to ensure their availability or get them to take certain options into
account. The command that controls a service — **/etc/init.d/service
operation** — doesn't take runlevel into consideration, assumes (wrongly) that
the service is currently being used, and may thus initiate incorrect operations
(starting a service that was deliberately stopped, or stopping a service that is
already stopped, etc.). Debian therefore introduced the **invoke-rc.d** program:
this program must be used by maintainer scripts to run services initialization
scripts and it will only execute the necessary commands. Note that, contrary
to common usage, the .d suffix is used here in a program name, and not in a
directory.
#### end ####

**Finally, init starts control programs for various virtual consoles ( getty ). It displays a prompt,
waiting for a username, then executes login user to initiate a session.**

#### Console and terminal ####
The first computers were usually separated into several, very large parts: the
storage enclosure and the central processing unit were separate from the pe-
ripheral devices used by the operators to control them. These were part of
a separate furniture, the **“console”**. This term was retained, but its meaning
has changed. It has become more or less synonymous with “terminal”, being
a keyboard and a screen.

With the development of computers, operating systems have offered several
virtual consoles to allow for several independent sessions at the same time,
even if there is only one keyboard and screen. **Most GNU/Linux systems offer
six virtual consoles (in text mode)**, accessible by typing the key combinations
**Control+Alt+F1** through **Control+Alt+F6**.

**By extension, the terms “console” and “terminal” can also refer to a terminal
emulator in a graphical X11 session (such as xterm , gnome-terminal or kons
ole ).**

## Remote Login ##

It is essential for an administrator to be able to connect to a computer remotely. Servers, confined in their own room. are rarely equipped with permanent keyboards and monitors — but
they are connected to the network.

### Client, Server ###

A system where several processes communicate with each other is often de-
scribed with the “client/server” metaphor. The server is the program that
takes requests coming from a client and executes them. It is the client that
controls operations, the server doesn't take any initiative of its own.

### Remote Login : telnet ###

The **telnet** protocol, the oldest remote login service, is the worst in terms of security. Data and
passwords are sent in clear text — that is, not encrypted — leaving them vulnerable to anyone
snooping on the network.

There is, however, an adaptation that corrects its most crippling defects; it uses SSL (Secure
Socket Layer) to authenticate the partner and encrypt communications. The **telnetd-ssl** and
**telnet-ssl** packages provide, respectively, the server and client software.

### Authentication, encryption ###

When you need to give a client the ability to conduct or trigger actions on a
server, security is important. You must ensure the identity of the client; this
is authentication. This identity usually consists of a password that must be
kept secret, or any other client could get the password. This is the purpose of
encryption, which is a form of encoding that allows two systems to commu-
nicate confidential information on a public channel while protecting it from
being readable to others.

**Authentication and encryption are often mentioned together, both because
they are frequently used together**, and because they are usually implemented
with similar mathematical concepts.

### Secure Remote Login : SSH ###

The SSH (Secure Shell) protocol, contrary to **telnet**, was designed with security and reliability in
mind. Connections using SSH are secure: the partner is authenticated and all data exchanges
are encrypted.

#### The SSH(Secure Shell) : SSH ####
SSH tools provide secure variants of the programs from the classic RSH (Re-
mote Shell) family — rsh , rlogin , and rcp . These are still available in the
rsh-server and rsh-client packages, but their usage is strongly discouraged.
#### End ####

SSH also offers two file transfer services. **scp** is a command line tool that can be used like **cp** , except that any path to another machine is prefixed with the machine's name, followed by a
colon. 

        $ scp file machine:/tmp/
        

**sftp** is an interactive command, similar to **ftp** . In a single session, **sftp** can transfer several files, and it is possible to manipulate remote files with it (delete, rename, change permissions, etc.)

Debian uses OpenSSH, a free version of SSH maintained by the OpenBSD project (a free operat-
ing system based on the BSD kernel, focused on security) and fork of the original SSH software
developed by the SSH Communications Security Corp company, of Finland. This company ini-
tially developed SSH as free software, but eventually decided to continue its development under
a proprietary license. The OpenBSD project then created OpenSSH to maintain a free version of
SSH.

#### fork ####
A **“fork”**, in the software field, **means a new project that starts as a clone of an
existing project**, and that will compete with it. From there on, both software
will usually quickly diverge in terms of new developments. A fork is often the
result of disagreements within the development team.

The option to fork a project is a direct result of the very nature of free soft-
ware; a fork is a healthy event when it enables the continuation of a project
as free software (for example in case of license changes). A fork arising from
technical or personal disagreements is often a waste of human resources; an-
other resolution would be preferable. Mergers of two projects that previously
went through a prior fork are not unheard of.

Since Etch, OpenSSH is split into two packages. The client part is in the **openssh-client** package,
and the server is in the **openssh-server** package. The ssh meta-package depends on both parts
and facilitates installation of both (**apt-get install ssh**).

#### Hardware acceleration for SSH ####
Some hardware provides native support of mathematical functions used by
encryption, which can speed up the required calculations, thus increasing per-
formance of some tools (and lightening the load on the main processor). These
tools notably include the OpenSSL library, which is in turn used by OpenSSH.
Although a project for standardization of drivers is underway (notably at the
kernel level), the variety of hardware is still managed inequitably and hetero-
geneously. For example, the Padlock system included in Via C3 processors is
only partially supported. While the Linux kernel does offer various encryption
algorithms, the OpenSSL 0.9.8 library in Squeeze only handles delegation of
AES encryption to the hardware dedicated to that purpose, but not the SHA
algorithms; you have to recompile it with a patch.

        http://www.logix.cz/michal/devel/padlock/

### Key-Based Authentication ###
Each time someone logs in over SSH, the remote server asks for a password to authenticate
the user. This can be problematic if you want to **automate** a connection, or if you use a tool
that requires frequent connections over SSH. **This is why SSH offers a key-based authentication system.**

The user generates a key pair on the client machine with **ssh-keygen -t rsa;** the public key is
stored in **~/.ssh/id_rsa.pub**, while the corresponding private key is stored in **~/.ssh/id_rsa**.
The user then uses **ssh-copy-id server** to add their public key to the **~/.ssh/authorized_keys** file on the server. If the private key was not protected with a “passphrase” at the time
of its creation, all subsequent logins on the server will work without a password. Otherwise,
the private key must be decrypted each time by entering the passphrase. Fortunately, **ssh-
agent** allows us to keep private keys in memory to not have to regularly re-enter the password.
For this, you simply use **ssh-add** (once per work session) provided that the session is already
associated with a functional instance of **ssh-agent**. Debian activates it by default in graphical
sessions, but this can be deactivated by changing **/etc/X11/Xsession.options**. For a console
session, you can manually start it with **eval $(ssh-agent)**.

### Protection of the private key ###
Whoever has the private key can login on the account thus configured. This
is why access to the private key is protected by a “passphrase”. Someone who
acquires a copy of a private key file (for example, **~/.ssh/id_rsa**) still has to
know this phrase in order to be able to use it. This additional protection is not,
however, impregnable, and if you think that this file has been compromised,
it is best to disable that key on the computers in which it has been installed
(by removing it from the **authorized_keys** files) and replacing it with a newly
generated key.

### OpenSSL flaw in Debian Etch ###
he OpenSSL library, as initially provided in Debian Etch, had a serious prob-
lem in its random number generator (RNG). Indeed, the Debian maintainer
had made a change in order for the library to not be the source of warnings
for programs using it and that would be analyzed by memory testing tools
like valgrind . Unfortunately, this change also meant that the RNG was em-
ploying only one source of entropy corresponding to the process number (PID)
whose 32,000 possible values do not offer enough randomness.

        http://www.debian.org/security/2008/dsa-1571

Specifically, whenever OpenSSL was used to generate a key, it always pro-
duced a key within a known set of hundreds of thousands of keys (32,000
multiplied by a small number of key lengths). This affected SSH keys, SSL
keys, and X.509 certificates used by numerous applications, such as Open-
VPN. A cracker had only to try all of the keys to gain unauthorized access. To
reduce the impact of the problem, the SSH daemon was modified to refuse
problematic keys that are listed in the openssh-blacklist and openssh-blacklist-
extra packages. Additionally, the ssh-vulnkey command allows identification
of possibly compromised keys in the system.

A more thorough analysis of this incident brings to light that it is the result
of multiple (small) problems, both at the OpenSSL project, as well as with
the Debian package maintainer. A widely used library like OpenSSL should
— without modifications — not generate warnings when tested by valgrind .
Furthermore, the code (especially the parts as sensitive as the RNG) should be
better commented to prevent such errors. The Debian maintainer, for his part,
wanting to validate his modifications with the OpenSSL developers, simply ex-
plained his modifications without providing them the corresponding patch to
review. He also did not clearly identify himself as the maintainer of the corre-
sponding Debian package. Finally, in his maintenance choices, the maintainer
did not clearly document the changes made to the original code; all the mod-
ifications are effectively stored in a Subversion repository, but they ended up
all lumped into one single patch during creation of the source package.

It is difficult under such conditions to find the corrective measures to prevent
such incidents from recurring. The lesson to be learned here is that every
divergence Debian introduces to upstream software must be justified, docu-
mented, submied to the upstream project when possible, and widely pub-
licized. It is from this perspective that the new source package format (“3.0
(quilt)”) and the Debian patch tracker were developed.

        http://patch-tracker.debian.org

### Using remove X11 Application ###

The SSH protocol allows forwarding of graphical data (“X11” session, from the name of the most
widespread graphical system in Unix); the server then keeps a dedicated channel for those data.
Specifically, **a graphical program executed remotely can be displayed on the X.org server of the
local screen**, and the whole session (input and display) will be secure. Since this feature allows
remote applications to interfere with the local system, it is disabled by default. You can enable
it by specifying **X11Forwarding yes** in the server configuration file ( **/etc/ssh/sshd_config** ).
Finally, the user must also request it by adding the **-X** option to the ssh command-line.

### Creating Encrypted Tunnels with Port Forwarding ###
Its **-R** and **-L** options allow **ssh** to create “encrypted tunnels” between two machines, securely forwarding a local TCP port (see sidebar “TCP/UDP” (page 222)) to **a remote machine** or vice
vers

#### Tunnel ####
The Internet, and most LANs that are connected to it, operate in packet mode
and not in connected mode, meaning that a packet issued from one computer
to another is going to be stopped at several intermediary routers to find its
way to its destination. You can still simulate a connected operation where the
stream is encapsulated in normal IP packets. These packets follow their usual
route, but the stream is reconstructed unchanged at the destination. We call
this a “tunnel”, analogous to a road tunnel in which vehicles drive directly
from the entrance (input) to the exit (output) without encountering any inter-
sections, as opposed to a path on the surface that would involve intersections
and changing direction.

You can use this opportunity to add encryption to the tunnel: the stream that
flows through it is then unrecognizable from the outside, but it is returned in
decrypted form at the exit of the tunnel.

**ssh -D [bind_address:]port host**  Specifies a local “dynamic” application-level port forwarding.  This works by allocating a socket to listen to port on the local side, optionally bound to the specified bind_address.  Whenever a connection is made to this port, the connection is forwarded over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine. Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server.  Only root can forward privileged ports.  Dynamic port forwardings can also be specified in the configuration file.

**ssh -L 8000:server:25 intermediary** establishes an SSH session with the intermediary host
and listens to **local port 8000** (see Figure 9.2, “Forwarding a local port with SSH” (page 193)).
**For any connection established on this port, ssh will initiate a connection from the intermediary computer to port 25 on the server**, and will bind both connections together.

**ssh -R 8000:server:25 intermediary** also establishes an SSH session to the intermediary
computer, but it is **on this machine that ssh listens to port 8000** (see Figure 9.3, “Forwarding a
remote port with SSH” (page 194)). **Any connection established on this port will cause ssh to open a connection from the local machine on to port 25 of the server**, and to bind both connec-
tions together.

In both cases, connections are made to port 25 on the server host, which pass through the SSH
tunnel established between the local machine and the intermediary machine. **In the first case**, the
**entrance to the tunnel is local port 8000**, and the data move towards the intermediary machine
before being directed to the server on the “public” network. **In the second case**, the input and
output in the tunnel are reversed; **the entrance is port 8000 on the intermediary machine**, the
output is on the local host, and the data are then directed to the server. In practice, the server
is usually either the local machine or the intermediary. That way SSH secures the connection
from one end to the other.

![](./images/ssh_local_port_forward.png)

![](./images/ssh_remote_port_forward.png)

### Important : See dictory html_source for more about ssh tunnel ###

### Using Remote Graphical Desktops ###

VNC (Virtual Network Computing) allows remote access to graphical desktops.

This tool is mostly used for technical assistance; the administrator can see the errors that the
user is facing, and show them the correct course of action without having to stand by them.

First, the user must authorize sharing their session. The GNOME and KDE graphical desk-
top environments include, respectively, **vino** and **krfb**, which provide a graphical interface
that allows sharing an existing session over VNC (found, respectively, in the menus at System
 Preferences → Remote Desktop and **K → Internet → Desktop Sharing)**. For other graphi-
cal desktop environments, the **x11vnc** command (from the Debian package of the same name)
serves the same purpose; you can make it available to the user with an explicit icon.

When the graphical session is made available by VNC, the administrator must connect to it with
a VNC client. GNOME has **vinagre and tsclient** for that, while KDE includes krdc (in the menu
at **K → Internet → Remote Desktop Client)**. There are other VNC clients that use the command
line, such as **xvnc4viewer** in the Debian package of the same name. Once connected, the ad-
ministrator can see what's going on, work on the machine remotely, and show the user how to
proceed.


#### VNC over SSH ####
If you want to connect by VNC, and you don't want your data sent in clear
text on the network, it is possible to encapsulate the data in an SSH tunnel
(see Section 9.2.2.3, “Creating Encrypted Tunnels with Port Forwarding” (page
192)). You simply have to know that VNC uses port 5900 by default for the
first screen (called “localhost:0”), 5901 for the second (called “localhost:1”), etc.
The ssh -L localhost:5901:localhost:5900 -N -T machine command cre-
ates a tunnel between local port 5901 in the localhost interface and port 5900
of the machine host. The first “localhost” restricts SSH to listening to only that
interface on the local machine. The second “localhost” indicates the interface
on the remote machine which will receive the network traffic entering in “lo-
calhost:5901”. Thus vncviewer localhost:1 will connect the VNC client to
the remote screen, even though you indicate the name of the local machine.
When the VNC session is closed, remember to close the tunnel by also quiing
the corresponding SSH session.


#### Display manager ####
gdm , kdm and xdm are Display Managers. They take control of the graphical
interface shortly after boot in order to provide the user a login screen. Once
the user has logged in, they execute the programs needed to start a graphical
work session.
#### end ####

**VNC also works for mobile users, or company executives, who occasionally need to login from
their home to access a remote desktop similar to the one they use at work.** The configuration
of such a service is more complicated: you first install the **vnc4server** package, change the con-
figuration of the display manager to accept **XDMCP** Query requests (for gdm , this can be done
graphically via the **System → Administration → Login** Screen menu and then the “Remote”
tab; note that this applies only to gdm and not gdm3 , which is the version installed by default in
Squeeze), and finally, start the VNC server with **inetd** so that a session is automatically started
when a user tries to login. For example, you may add this line to **/etc/inetd.conf**:

        5950 stream tcp nowait nobody.tty /usr/bin/Xvnc Xvnc -inetd -query
            localhost -once -geometry 1024x768 -depth 16 securitytypes=none

Redirecting incoming connections to the display manager solves the problem of authentication,
because only users with local accounts will pass the gdm login screen (or equivalent kdm , xdm ,
etc.). As this operation allows multiple simultaneous logins without any problem (provided the
server is powerful enough), it can even be used to provide complete desktops for mobile users
(or for less powerful desktop systems, configured as thin clients). Users simply login to the
server's screen with vncviewer **server:50** , because the port used is **5950**.


## Managing Rights ##

Linux is definitely a multi-user system, so it is necessary to provide a permission system to
control the set of authorized operations on files and directories, which includes all the system
resources and devices (on a Unix system, any device is represented by a file or directory). This
principle is common to all Unix systems, but a reminder is always useful, especially as there are
some interesting and relatively unknown advanced uses.


- its owner(symbolized by u as in “user”)
- its owner group(symbolized by **g** as in "group"),representing all the members of group;
- the others(symbolized by o as in "others")


There types of rights can be combined:

- reading (symbolized by **"r"** in read);
- writing(modifying, symbolized by **"w"** as in "write");
- executing(symbolized by **x** "eXecute")

In the case of a file, these rights are easily understood: read access allows reading the content
(including copying), write access allows changing it, and execute access allows you to run it
(which will only work if it's a program).

### setuid and setgid executables ###

**Two particular rights are relevant to executable files**: **setuid** and **setgid**(sym-
bolized with the letter “s”). Note that we frequently speak of “bit”, since each
of these boolean values can be represented by a 0 or a 1. **These two rights al-
low any user to execute the program with the rights of the owner or the group,**
respectively. This mechanism grants access to features requiring higher level
permissions than those you would usually have.

Since a setuid root program is systematically run under the super-user iden-
tity, it is very important to ensure it is secure and reliable. Indeed, a user
who would manage to subvert it to call a command of their choice could then
impersonate the root user and have all rights on the system.
### end ###

**A directory is handled differently**. **Read** access gives the right to consult the **list** of its entries (files and directories), **write** access allows **creating or deleting files**, and **execute** access allows **crossing through it (especially to go there with the cd command)**. **Being able to cross through a directory without being able to read it gives permission to access the entries therein that are known by name, but not to find them if you do not know that they exist or under what name.**

### setgid directory and sticky bit ###

The **setgid** bit also applies to directories. **Any newly-created item in such di-
rectories is automatically assigned the owner group of the parent directory**,
instead of inheriting the creator's main group as usual. This setup avoids the
user having to change its main group (with the newgrp command) when work-
ing in a file tree shared between several users of the same dedicated group.

The **“sticky”** bit (symbolized by the letter **“t”**) is a permission that is **only useful
in directories**. It is especially used for temporary directories where everybody
has write access (such as /tmp/ ): **it restricts deletion of files so that only their
owner (or the owner of the parent directory) can do it.** Lacking this, everyone
could delete other users' files in /tmp/ .
### end ###

There commands control the permissions associated with a flie:

- **chown user file** changes the owner of the file.
- **chgrp group file**  alters the owner group.
- **chmod rights file** changes the permissions for the file.

There are two ways of presenting rights. Among them, the symbolic representation is probably
the easiest to understand and remember. It involves the letter symbols mentioned above. You
can define rights for each category of users **( u / g / o )**, by setting them explicitly (with = ), by **adding ( + )**, or **subtracting ( - )**. Thus the **u=rwx,g+rw,o-r** formula gives the owner read, write, and execute rights, adds read and write rights for the owner group, and removes read rights for other users. Rights not altered by the addition or subtraction in such a command remain
unmodified. The letter a , for “all”, covers all three categories of users, so that **a=rx** grants all
three categories the same rights (read and execute, but not write).

The **(octal) numeric** representation associates each right with a value: **4 for read, 2 for write,
and 1 for execute**. We associate each combination of rights with the sum of the figures. Each
value is then assigned to different categories of users by putting them end to end in the usual
order (owner, group, others).

To represent **special rights**, you can prefix a fourth digit to this number according to the same
principle, where the **setuid , setgid and sticky bits are 4, 2 and 1**, respectively. **chmod 4754 will associate the setuid bit with the previously described rights.**

**Note that the use of octal notation only allows to set all the rights at once on a file;** you can not use it to simply add a new right, such as read access for the group owner, since you must take
into account the existing rights and compute the new corresponding numerical value.

#### Recursvie operation ####
Sometimes we have to change rights for an entire file tree. All the commands
above have a **-R option** to operate recursively in sub-directories.
The distinction between directories and files sometimes causes problems with
recursive operations. That's why the **“X” letter** has been introduced in the
symbolic representation of rights. **It represents a right to execute which ap
plies only to directories (and not to files lacking this right)**. Thus, **chmod -R a+X** directory will only add execute rights for all categories of users (a) for
all of the sub-directories and files for which at least one category of user (even
if their sole owner) already has execute rights.

####umask####
When an application **creates a file**, it assigns indicative permissions, knowing
that the system automatically **removes certain rights**, given by the command
umask . Enter umask in a shell; you will see a mask such as **0022**. This is simply
an octal representation of the rights to be **systematically removed (in this case,
the write right for the group and other users).** 

If you give it a new octal value, the **umask command modifies the mask**. Used
in a shell initialization file (for example,** ~/.bash_profile**), **it will effectively
change the default mask for your work sessions.**

## Adminsitration Interfaces ##

**Using a graphical interface for administration is interesting in various circumstances. An ad-
ministrator does not necessarily know all the configuration details for all their services, and
doesn't always have the time to go seeking out the documentation on the matter. A graphical
interface for administration can thus accelerate the deployment of a new service. It can also
simplify the setup of services which are hard to configure.**

Such an interface is only an aid, and not an end in itself. In all cases, the administrator must
master its behavior in order to understand and work around any potential problem.

Since no interface is perfect, you may be tempted to try several solutions. This is to be avoided as
much as possible, since different tools are sometimes incompatible in their work methods. Even
if they all target to be very flexible and try to adopt the configuration file as a single reference,
they are not always able to integrate external changes.

### .Administrating On a Web Interface:webmin ###
This is, without a doubt, **one of the most successful administration interfaces**. It is a modular
system managed through a web browser, covering a wide array of areas and tools. Furthermore,
it is internationalized and available in many languages.

Sadly, **webmin** is no longer part of Debian since Etch. Its Debian maintainer — Jaldhar H. Vyas —
removed the packages he created because he no longer had the time required to maintain them
at an acceptable quality level. Nobody has officially taken over, so Squeeze does not have the
webmin package.

There is, however, an unofficial package distributed on the **webmin.com** website. Contrary
to the packages included in Sarge, this package is monolithic; all of its configuration modules
are installed and activated by default, even if the corresponding service is not installed on the
machine.

#### Changing the root password ####
On first login, identification is conduced with the root username and its usual
password. It is recommended to change the password used for webmin as soon
as possible, so that if it is compromised, the root password for the server will
not be involved, even if this confers important administrative rights to the
machine.

Beware! Since webmin has so many features, a malicious user accessing it
could compromise the security of the entire system. In general, interfaces of
this kind are not recommended for important systems with strong security
constraints (firewall, sensitive servers, etc.).
#### end ####

Webmin is used through a web interface, but it does not require Apache to be installed. Essen-
tially, this software has its own integrated mini web server. **This server listens by default on
port 10000 and accepts secure HTTP connections.**

### Included modules cover a wide variety of services, among which: ###

- all base services: creation of **users** and **groups**, management of **crontab** files, **init** scripts, **viewing of logs**, etc.

- **bind**: DNS server configuration (name service);

- **postfix**: SMTP server configuration(e-mail);

- **ineted** : confiugration of the **ineted** super-server;

- **quota** : user quota management;

- **dhcpd**: DHCP server configuration;

- **proftpd** : FTP server configuration;

- **samba** : Samba file server configuration;

- **software** : installaiton or removal of software from Debian packages and system updates;

The administration interface is available in a web browser at **https://localhost:10000**. Beware!
Not all the modules are directly usable. Sometimes they must be configured by specifying the
locations of the corresponding configuration files and some executable files (program). Fre-
quently the system will politely prompt you when it fails to activate a requested module.


#### gnome-system-tools ####
The GNOME project also provides a graphical administrator interface in the gnome-system-tool package. Installed by default for a desktop sys-tem, it includes applications that can be found in the menu at System Administration. Easy to use, these applications cover only a limited number
of base services: **user and group management, time configuration, network configuration, disk management, and management of startup services.**

### Configuring Packages: debconf ###

Many packages are automatically configured after asking a few questions during installation
through the **Debconf tool**. These packages can be reconfigured by running **dpkg-reconfigure
package**.

For most cases, these settings are very simple; only a few important variables in the configu-
ration file are changed. These variables are often grouped between two “demarcation” lines so
that reconfiguration of the package only impacts the enclosed area. In other cases, reconfigu-
ration will not change anything if the script detects a manual modification of the configuration
file, in order to preserve these human interventions (because the script can't ensure that its
own modifications will not disrupt the existing settings).

### Preserving changes ###
The Debian Policy expressly stipulates that everything should be done to pre-
serve manual changes made to a configuration file, so more and more scripts
take precautions when editing configuration files. The general principle is
simple: the script will only make changes if it knows the status of the config-
uration file, **which is verified by comparing the checksum of the file against
that of the last automatically generated file.** If they are the same, the script
is authorized to change the configuration file. Otherwise, it determines that
the file has been changed and asks what action it should take (install the new
file, save the old file, or try to integrate the new changes with the existing
file). This precautionary principle has long been unique to Debian, but other
distributions have gradually begun to embrace it.

The **ucf** program (from the Debian package of the same name) can be used to
implement such a behavior.

## syslog System Events ##

### Principle and Mechanism ###

The **rsyslogd** daemon is responsible for collecting service messages coming **from applications and the kernel**, then distribution them to log files(usually stored in the /var/log/directory). It obeys the **/etc/rsyslog.conf** configuration file.

Each **log message** is associated with an **applicaiton subsystem**(called "facility" in the documentation):

- auth and authpriv : for authentication;
- cron : comes from task scheduling services, cron and atd;
- daemon : affects a daemon without any special classification (DNS, NTP, etc.);
- ftp : concerns the FTP server;
- kern : message coming from the kernel;
- lpr : comes from the printing subsystem;
- mail : comes from the e-mail subsystem;
- news : Usenet subsystem message (especially from an NNTP — Network News Transfer
Protocol — server that manages newsgroups);
- syslog : messages from the syslogd server, itself;
- user : user messages (generic);
- uucp : messages from the UUCP server (Unix to Unix Copy Program, an old protocol no-
tably used to distribute e-mail messages);
- local0 to local7 : reserved for local use.

Each **message** is also associated with a **priority level**. Here is the list in decreasing order:

- emerge : “Help!” There's an emergency, the system is probably unusable.
- alert : hurry up, any delay can be dangerous, action must be taken immediately;
- crit : conditions are critical;
- err : error;
- warn : warning(potential error)
- notice : conditions are normal, but the message is important;
- info : informative message;
- debug : debugging message.


### The Configuration File ###

The syntax of the **/etc/rsyslog.conf** file is detailed in the **rsyslog.conf(5)** manual page,
but there is also HTML documentation available in the **rsyslog-doc** package ( /usr/share/doc/
rsyslog-doc/html/index.html ). The overall principle is to write **“selector” and “action”**
pairs. The selector defines all relevant messages, and the actions describes how to deal with
them.

### Important : Syntax of the Selector ###

The selector is a **semicolon-separated** list of **subsystem.priority** pairs(example: auth.notice;mail.info). 

An **asterisk** may represent **all subsystems or all priorities**(examples: ***.alert or mail.
***).

Several subsystems can be grouped, by separating them with a comma (example: **auth,mail.info**).

The priority indicated also **covers messages of equal or higher priority**; **thus auth.alert
indicates the auth subsystem messages of alert or emerg priority.**

Prefixed with an **exclamation point (!)**, it indicates the **opposite**, in other words the **strictly lower priorities**; **auth.!notice , thus, indicates messages issued from auth , with info or debug priority.**

Prefixed with an **equal sign (=)**, it corresponds to **precisely and only the priority indicated** ( **auth.=notice** only concerns messages from auth with notice priority).

**Each element in the list on the selector overrides previous elements**. It is thus possible to restrict a set or to exclude certain elements from it. For example, **kern.info;kern.!err means messages from the kernel with priority between info and warn **. The **none priority indicates the empty set (no priorities), and may serve to exclude a subsystem from a set of messages. Thus, *.crit;
kern.none indicates all the messages of priority equal to or higher than crit not coming from
the kernel.**

### Syntax of Actions ###

#### The named pipe, a persistent pipe ####
A named pipe is a particular type of file that operates like a traditional pipe
(the pipe that you make with the “|” symbol on the command line), but via a
file. This mechanism has the advantage of being able to relate two unrelated
processes. Anything written to a named pipe blocks the process that writes
until another process attempts to read the data written. This second process
reads the data written by the first, which can then resume execution.

**Such a file is created with the `mkfifo` command**.

The variable possible actions are:

- add the message to a **file** (example: /var/log/messages );

- send the message to a **remote syslog server** (example: @log.falcot.com );

- send the message to an existing **named pipe** (example: |/dev/xconsole ); 

- send the message to one or **more users, if they are logged in** (example: root,rhertzog );

- send the message to **all logged in users** (example: * );

- write the message in a **text console** (example: **/dev/tty8** ).

#### Forwarding logs ####
It is a good idea to record the most important logs on a separate machine (per-
haps dedicated for this purpose), since this will prevent any possible intruder
from removing traces of their intrusion (unless, of course, they also compro-
mise this other server). Furthermore, in the event of a major problem (such
as a kernel crash), you have the logs available on another machine, which in-
creases your chances of determining the sequence of events that caused the
crash.

To accept log messages sent by other machines, you must **reconfigure rsys-
log**: in practice, it is sufficient to activate the **ready-for-use entries in /etc/rsyslog.conf ($ModLoad imudp and $UDPServerRun 514).**

## The inetd Super-Server ##
Inetd (often called “Internet super-server”) is a server of servers. It executes rarely used servers
on demand, so that they do not have to run continuously.

The **/etc/inetd.conf** file lists these servers and their usual ports. **The inetd command listens
to all of them; when it detects a connection to any such port, it executes the corresponding
server program.**

### Register a server in inetd.conf ###
Packages frequently want to register a new server in the **/etc/inetd.conf**
file, but Debian Policy prohibits any package from modifying a configuration
file that it doesn't own. This is why the **updated-inetd** script (in the pack-
age with the same name) was created: It manages the configuration file, and
other packages can thus use it to register a new server to the super-server's
configuration.


Each significant line of the /etc/inetd.conf file describes a server through seven fields (sep-
arated by spaces):

- The TCP or UDP port number, or the service name (which is mapped to a standard port
number with the information contained in the **/etc/services** file).

- The socket type: stream for a TCP connection, dgram for UDP datagrams.

- The protocol: tcp or udp .

- The options: two possible values: wait or nowait , to tell **inetd** whether it should wait
or not for the end of the launched process before accepting another connection. For TCP
connections, easily multiplexable, you can usually use nowait . For programs responding
over UDP, you should use nowait only if the server is capable of managing several con-
nections in parallel. You can suffix this field with a period, followed by the maximum
number of connections authorized per minute (the default limit is 40).

- The user name of the user under whose identity the server will run.

- The full path to the server program to execute.

- The arguments: this is a complete list of the program's arguments, including its own name
( argv[0] in C).

The following example illustrates the most common cases:

        talk   dgram  udp wait   nobody.tty  /usr/sbin/in.talkd in.talkd
        finger stream tcp nowait nobody      /usr/sbin/tcpd /usr/sbin/in.fingerd
        ident  stream tcp nowait nobody      /usr/sbin/identd identd -i
        
The **tcpd** program is frequently used in the **/etc/inetd.conf** file. It allows limiting incoming
connections by applying access control rules, documented in the **hosts_access(5)** manual page,
and which are configured in the **/etc/hosts.allow** and **/etc/hosts.deny** files. Once it has
been determined that the connection is authorized, **tcpd** executes the real server (like **/usr/
bin/in.fingerd** in our example).

#### Wietse Venema ####
Wietse Venema, whose expertise **in** security has made him a renowned pro-
grammer, is the author of the **tcpd** program. He is also the main creator of
Postfix, the modular e-mail server (SMTP, Simple Mail Transfer Protocol), de-
signed to be safer and more reliable than sendmail , which features a long
history of security vulnerabilities.

####Other inetd commands####
There is no lack of alternatives. In addition to openbsd-inetd and netkit-inetd
already mentioned, there are inetutils-inetd, micro-inetd, rlinetd and xinetd.
This last incarnation of a super-server offers very interesting possibilities.
Most notably, its configuration can be split into several files (stored, of course,
in the **/etc/xinetd.d/ directory**), which can make an administrator's life eas-
ier.

## Scheduling Tasks with cron and atd ##
**cron** is the daemon responsible for executing scheduled and recurring commands (every day,
every week, etc.); **atd is that which deals with commands to be executed a single time**, but at a
specific moment in the future.

In a Unix system, many tasks are scheduled for regular execution:

- rotating the logs;
- updating the database for the **locate** program;
- back-ups;
- maintenance scripts (such as cleaning out temporary files).

By default, all users can schedule the execution of tasks. Each user has thus their own crontab
in which they can record scheduled commands. It can be edited by running **crontab -e**(its
content is stored in the /var/spool/cron/crontabs/ user file).

### Restricting cron or atd ###
You can restrict access to cron by creating an explicit authorization file
(whitelist) in **/etc/cron.allow**, in which you indicate the only users autho-
rized to schedule commands. All others will automatically be deprived of
this feature. Conversely, to only block one or two troublemakers, you could
write their username in the explicit prohibition file (blacklist), **/etc/cron.
deny**. This same feature is available for atd , with the **/etc/at.allow** and
**/etc/at.deny** files.

The root user has their own crontab, but can also use the **/etc/crontab** file, or write additional
crontab files in the **/etc/cron.d** directory. These last two solutions have the advantage of being
able to specify the user identity to use when executing the command.

- programes in the /etc/cron.hourly/  once per hour
- programes in the /etc/cron.daily/   once per day
- programes in the /etc/cron.weekly/  once per week
- progarmes in the /etc/cron.monthly/ once per month 

Many Debian packages rely on this service, they put maintenance scripts in these directories,
which ensure optimal operation of their services.

#### Text shortcuts for cron ####
**cron** recognizes some **abbreviations** which replace the first five fields in a crontab entry. They correspond to the most classic scheduling options.

        cron recognizes some abbreviations which replace the first five fields
        crontab entry. They correspond to the most classic scheduling options:
            • @yearly: once per year (January 1, at 00:00);
            • @monthly: once per month (the 1st of the month, at 00:00);
            • @weekly: once per week (Sunday at 00:00);
            • @daily: once per day (at 00:00);
            • @hourly: once per hour (at the beginning of each hour).

#### cron and daylight savings time ####

In Debian, cron takes the time change (for Daylight Savings Time, or in fact for
any significant change in the local time) into account as best as it can. Thus,
the commands that should have been executed during an hour that never
existed (for example, tasks scheduled at 2:30 am during the Spring time change
in France, since at 2:00 am the clock jumps directly to 3:00 am) are executed
shortly aer the time change (thus around 3:00 am DST). On the other hand,
in autumn, when commands would be executed several times (2:30 am DST,
then an hour later at 2:30 am standard time, since at 3:00 am DST the clock
turns back to 2:00 am) are only executed once.

Be careful, however, if the order in which the different scheduled tasks and
the delay between their respective executions matters, you should check the
compatibility of these constraints with cron 's behavior; if necessary, you can
prepare a special schedule for the two problematic nights per year.

Each significant line of a crontab describes a scheduled command with the six (or seven) follow-
ing fields:

- the value for the minute (number from 0 to 59);
- the value for the hour (from 0 to 23).
- the value for the day of the month(from 1 to 31)
- the value for the month (from 1 to 12);
- the value for the day of the week (from 0 to 7, 1 corresponding to Monday, Sunday being
represented by both 0 and 7; it is also possible to use the first three letters of the name of
the day of the week in English, such as Sun , Mon , etc.);
- the user name under whose identity the command must be executed (in the /etc/
crontab file and in the **fragments** located in **/etc/cron.d/**, but not in the users' own
crontab files);
- the command to execute (when the conditions defined by the first five columns are met).

All these details are documented in the crontab(5) man page.

Each value can be expressed in the form of a **list** of possible values (**separated by commas**). The
syntax **a-b** describes the interval of all the values **between a and b** . The syntax **a-b/c** describes the **interval with an increment** of c (example: 0-10/2 means 0,2,4,6,8,10 ). **An asterisk * is a wildcard**, representing all possible values.

        #Download data every night at 7:25 pm
        25 19 * * * $HOME/bin/get.pl
        
        #8:00 am, on weekdays (Monday through Friday)
        00 08 * * 1-5 $HOME/bin/dosomething
        
        #Restart the IRC proxy after each reboot
        @reboot /usr/bin/dircproxy

###Executing a command on boot###
To execute a command a single time, just after booting the computer, you can
use the **@reboot macro** (a simple restart of cron does not trigger a command
scheduled with @reboot). This macro replaces the first five fields of an entry
in the crontab.

### Using the at Command ###
The at executes a command at a specified moment in the future. It takes the **desired time and date** as command-line parameters, and the **command** to be executed in its standard input.

The command will be executed as if it had been entered in the current shell. at even takes care to
retain the current environment, in order to reproduce the same conditions when it executes
the command. The time is indicated by following the usual conventions: **16:12 or 4:12pm** rep-
resents 4:12 pm. The date can be specified in several European and Western formats, including
**DD.MM.YY** ( 27.07.12 thus representing 27 July 2012), **YYYY-MM-DD** (this same date being
expressed as 2012-07-27 ), MM/DD/[CC]YY (ie., 12/25/12 or 12/25/2012 will be December 25,
2012), or simple MMDD[CC]YY (so that 122512 or 12252012 will, likewise, represent Decem-
ber 25, 2012). Without it, the command will be executed as soon as the clock reaches the time
indicated (the same day, or tomorrow if that time has already passed on the same day). You can
also simply write **“today”** or **“tomorrow”**, which is self-explanatory.

        $at 09:00 27.07.12 <<END
        > echo "Don't forget to wish a Happy" | mail lolando@deiban.org
        > END
        warning: commands will be executed using /bin/sh
        job 31 at Fri Jul 27 09:00:00 2012

An alternative syntax postpones the execution for a given duration: **at now + number period**.
The period can be minutes , hours , days , or weeks. The number simply indicates the number of
said units that must elapse before execution of the command.

To cancel a task scheduled by cron , simply run crontab -e and delete the corresponding line
in the crontab file. For at tasks, it is almost as easy: run **atrm task-number** . The task number
is indicated by the at command when you scheduled it, but you can find it again with the **atq
command**, which gives the current list of scheduled tasks.

## Scheduling Asynchronous Tasks: anacron ##

**anacron** is the daemon that completes **cron** for computers that are not on at all times. Since
regular tasks are usually scheduled for the middle of the night, they will never be executed if
the computer is off at that time. **The purpose of anacron is to execute them, taking into account
periods in which the computer is not working.**

    
Please note that **anacron** will frequently execute such activity a few minutes after booting the
machine, which can render the computer less responsive. This is why the tasks in the **/etc/anacrontab** file are started with the nice command, which reduces their execution priority
and thus limits their impact on the rest of the system. Beware, the format of this file is not the
same as that of **/etc/crontab**; if you have particular needs for **anacron**, see the anacrontab(5)
manual page.

#### Priorities and nice ####
Unix systems (and thus Linux) are multi-tasking and multi-user systems. In-
deed, several processes can run in parallel, and be owned by different users:
the kernel mediates access to the resources between the different processes.
As a part of this task, it has a concept of priority, which allows it to favor
certain processes over others, as needed. When you know that a process can
run in low priority, you can indicate so by running it with nice program . The
program will then have a smaller share of the CPU, and will have a smaller
impact on other running processes. Of course, if no other processes needs to
run, the program will not be artificially held back.

**nice** works with levels of “niceness”: **the positive levels (from 1 to 19)** progres-
sively **lower** the priority, while the **negative levels (from -1 to -20)** will **increase**
it — but only root can use these negative levels. Unless otherwise indicated
(see the nice(1) manual page), **nice increases the current level by 10**.

If you discover that an already running task should have been started with
nice it is not too late to fix it; the **renice command changes the priority of an
already running process**, in either direction (but reducing the “niceness” of a
process is reserved to the root user).

Installation of the anacron package **deactivates execution by cron of the scripts** in the /etc/
cron.hourly/ , /etc/cron.daily/ , /etc/cron.weekly/ , and /etc/cron.monthly/ directo-
ries. This avoids their double execution by anacron and cron . The cron command remains ac-
tive and will continue to handle the other scheduled tasks (especially those scheduled by users).


## Quotas ##
**The quota system allows limiting disk space allocated to a user or group of users.** To set it up,
you must have a kernel that supports it (compiled with the CONFIG_QUOTA option) — as is the
case of Debian kernels. The quota management software is found in the quota Debian package.

To activate them in a filesystem, you have to indicate the **usrquota** and **grpquota** options in
**/etc/fstab** for the user and group quotas, respectively. Rebooting the computer will then
update the quotas in the absence of disk activity(a necessary condition for proper accouning of already used disk space uasge).

The **edqtoua user** (or **edquota -g group**) command allows you to **change the limits while examining current disk sapce usage.**

### Defining quotas with a script ###

The **setquota** program can be used in a script to automatically change many quotas. Its setquota(8) manual details the syntax to use.

The quota system allows you to set four limits:

- two limits (called “soft” and “hard”) refer to **the number of blocks consumed**. If the
filesystem was created with a block-size of 1 kilobyte, a block contains 1024 bytes from
the same file. Unsaturated blocks thus induce losses of disk space. A quota of 100 blocks,
which theoretically allows storage of 102,400 bytes, will however be saturated with just
100 files of 500 bytes each, only representing 50,000 bytes in total. 

- two limits (soft and hard) refer to **the number of inodes used**. Each file occupies at least
one inode to store information about it (permissions, owner, timestamp of last access,
etc.). It is thus a limit on the number of user files.

**A “soft” limit can be temporarily exceeded**; the user will simply be warned that they are ex-
ceeding the quota by the **warnquota** command, which is usually invoked by **cron**. A “hard”
limit can never be exceeded: **the system will refuse any operation that will cause a hard quota
to be exceeded.**


### Blocks and inodes : Important###
**The filesystem divides the hard drive into blocks** — **small contiguous areas**.
The size of these blocks is defined during creation of the filesystem, and gen-
erally varies between **1 and 8 kilobytes**.


**A block** can be used either to store the **real data of a file**, **or for meta-data**
used by the filesystem. Among this meta-data, you will especially find the
inodes. **An inode** uses a block on the hard drive (but this block is not taken into
consideration in the block quota, only in the inode quota), and contains both
the information on the file to which it corresponds (name, owner, permissions,
etc.) and the pointers to the data blocks that are actually used. For very large
files that occupy more blocks than it is possible to reference in a single inode,
there is an indirect block system; the inode references a list of blocks that do
not directly contain data, but another list of blocks.
###end###


With the **edquota -t** command, you can define a maximum authorized **“grace period”** within
which a soft limit may be exceeded. After this period, the soft limit will be treated like a hard
limit, and the user will have to reduce their disk space usage to within this limit in order to be
able to write anything to the hard drive.


### Setting up a default quota for new users ###
To automatically setup a quota for new users, you have to configure a template
user (with **edquota** or **setquota** ) and indicate their user name in the **QUOTAUSER**
variable in the **/etc/adduser.conf** file. This quota configuration will then be
automatically applied to each new user created with the **adduser** command.


## Backup : Important ##
Making backups is one of the main responsibilities of any administrator, but it is a complex
subject, involving powerful tools which are often difficult to master.

Many programs exist, such as **amanda**, a client/server system featuring many options, whose
**configuration is rather difficult**. **BackupPC** is also a client/server solution, but with a **web inter-face for configuration which makes it more user-friendly**. Dozens of other Debian packages are
dedicated to backup solutions, as you can easily confirm with **apt-cache search backup**.
Rather than detailing some of them, this section will present the thoughts of the Falcot Corp
administrators when they defined their backup strategy.

**At Falcot Corp, backups have two goals: recovering erroneously deleted files, and quickly restor-
ing any computer (server or desktop) whose hard drive has failed.**

### Backing Up with rsync ###
Backups on tape having been deemed too slow and costly, **data will be backed up on hard drives
on a dedicated server, on which the use of software RAID (see Section 12.1.1, “Software RAID”
(page 298)) will protect the data from hard drive failure.**

Desktop computers are not backed up individually, but users are advised that their personal account on their department's file server will be backed up.

The **rsync comamnd**(from the package of the same name) is used daily to back up these different servers.

### The hard link, a second name for the file ###
A hard link, as opposed to a symbolic link, can not be differentiated from the
linked file. Creating a hard link is essentially the same as giving an existing
file a second name. This is why the deletion of a hard link only removes one of
the names associated with the file. As long as another name is still assigned
to the file, the data therein remain present on the filesystem. It is interesting
to note that, unlike a copy, the hard link does not take up additional space on
the hard drive.

A hard link is created with the **ln target link command**. The link file is then
a new name for the target file. **Hard links can only be created on the same
filesystem, while symbolic links are not subject to this limitation.**
### end ###

**The available hard drive space prohibits implementation of a complete daily backup.** As such,
the **rsync** command is preceded by a duplication of the content of **the previous backup with
hard links**, which prevents usage of too much hard drive space. **The rsync process then only re-
places files that have been modified since the last backup. With this mechanism a great number of backups** can be kept in a small amount of space. Since all backups are immediately available
and accessible (for example, in different directories of a given share on the network), **you can
quickly make comparisons between two given dates.**

This backup mechanism is easily implemented with the **dirvish** program. It uses a backup
storage space (“bank” in its vocabulary) in which it places timestamped copies of sets of backup
files (these sets are called “vaults” in the dirvish documentation).

The main configuration is in the **/etc/dirvish/master.conf** file. It defines the location of the
backup storage space, the list of “vaults” to manage, and default values for expiration of the
backups. **The rest of the configuration is located in the bank/vault/dirvish/default.conf**
files and contains the specific configuration for the corresponding set of files.

        bank:
            /backup
        exclude:
            lost+found/
            core
            *~
        Runall:
            root  22:00
        expire-default: +15 days
        expire-rule:
        #   MIN HR  DOM     MON     DOW     STRFTIME_FMT
            *   *   *       *       1       +3 months
            *   *   1-7     *       1       +1 year
            *   *   1-7 1,4,7,10    1
        
        #The /etc/dirvish/master.conf file

The **bank** setting indicates the directory in which the backups are stored. 

The **exclude** setting allows you to indicate files (or file types) to exclude from the backup. 

The **Runall** is a list of file sets to backup with a time-stamp for each set, which allows you to assign the correct date to the copy, in case the backup is not triggered at precisely the assigned time. You have to indicate a time just before the actual execution time (which is, by default, 10:04 pm in Debian, according to /etc/cron.d/dirvish ). 

Finally, 

the **expire-default** and **expire-rule** settings define the expi-ration policy for backups.

The above example **keeps forever backups** that are generated on the **first Sunday of each quarter**, **deletes after one year those from the first Sunday of each month**,
and **after 3 months those from other Sundays**. 

**Other daily backups are kept for 15 days**. The order of the rules does matter, Dirvish uses the last matching rule, or the expire-default one if no other expire-rule matches.

### Scheduled expiration ###
The expiration rules are not used by **dirvish-expire** to do its job. In reality,

the expiration rules are applied **when creating a new backup copy to define**

the expiration date associated with that copy. **dirvish-expire** simply peruses
the stored copies and deletes those for which the expiration date has passed.

        client: rivendell.falcot.com
        tree: /
        xdev: 1
        index: gzip
        image-default: %Y%m%d
        exclude:
            /var/cache/apt/archives/*.deb
            /var/cache/man/**
            /tmp/**
            /var/tmp/**
            *.bak
        
        #The /backup/root/dirvish/default.conf file        
        

The above example specifies the set of files to back up: these are files on the machine **riven-
dell.falcot.com** (for local data backup, simply specify the name of the local machine as indicated by
hostname ), especially those in the **root tree (tree:/)**, except those listed in exclude . The backup
will be limited to the contents of **one filesystem (xdev:1)**. It will not include files from other
mount points. An index of saved files will be generated **(index:gzip)**, and the image will be
named according to the current date **(image-default:%Y%m%d)**.

There are many options available, all documented in the **dirvish.conf(5)** manual page. Once
these configuration files are setup, you have to initialize each file set with the **dirvish --
vault vault --init** command. From there on the daily invocation of **dirvish-runall** will
automatically create a new backup copy just after having deleted those that expired.

#### Remote backup over SSH ####
When dirvish needs to save data **to a remote machine**, it will use **ssh to con-
nect to it**, and will start **rsync** as a server. This requires the root user to be able
to automatically connect to it. The **use of an SSH authentication key** allows
precisely that (see Section 9.2.2.1, “Key-Based Authentication” (page 190)).
#### End ####

### Restoring Machines without Backups ###

Desktop computers, which are not backed up, will be easy to regenerate from CD-ROMs made by
the **mondo** program.

These bootable CD-ROMs allow complete re-installation of the machine's
system. 

But beware: files that are not part of the system or the user's home directory will not,
themselves, be backed up by **mondo** . This includes, for example, users' local **crontabs**, as well as any changes made to system configuration since the preparation of the CD-ROM.

The Falcot Corp administrators are aware of the limits in their backup policy. Since they can't
protect the backup server as well as a tape in a fireproof safe, they have installed it in a sepa-
rate room so that a disaster such as a fire in the server room won't destroy backups along with
everything else. Furthermore, they do an incremental backup on DVD-ROM once per week —
only files that have been modified since the last backup are included.

#### Backing up SQL and LDAP services ####
**many services (such as SQL or LDAP databases) can not be backed up by
simply copying their files (unless they are properly interrupted during creation
of the backups, which is frequently problematic, since they are intended to be
available at all times)**. As such, it is necessary to use an “export” mechanism
to **create a “data dump” that can be safely backed up**. **These are often quite
large, but they compress well. To reduce the storage space required, you will
only store a complete text file per week, and a diff each day, which is created
with a command of the type diff file_from_yesterday file_from_today.**
The **xdelta** program produces incremental differences from binary dump.

#### TAR, the standard for tape backups####
Historically, the simplest means of making a backup on Unix was to store
a TAR archive on a tape. The tar command even got its name from “Tape
ARchive”.

## Important : Hot Plugging : hotplug ##

### Introduce ###
The `hotplugg` kernel subssytem loads drivers for perpherals that can be hotpulgged. This includes USB peripherals(increasingly common), PCMCIA(cmommon expansion cards for laptops), IEEE 1394(aslo called "Firewire" or "I-link"), some SATA hard drives, and even, for some high-end servers, PCI or SCSI devices. **The kernel has a database that associates each device ID with the rquired drvier, This database is used during boot to load all the drivers for the peripheral devices detecetd on the different buses mentioned, but also when an additional hotplug device is connected. Once a driver is loaded. a message is sent to `udevd` so it will be able to create the corresponding entry in `/dev`**  

### The naming Problem ###
Before the apperance of hotplug connetions, it was easy to assign a fixed name to a device.

It was based simply on the position of the devices on their respective bus. But this is not possible
when such devices can come and go on the bus. The typical case is the use of a digital camera and
a USB key, both of which appear to the computer as disk drives. The first one connected may
be /dev/sdb and the second /dev/sdc (with /dev/sda representing the computer's own hard
drive). **The device name is not fixed; it depends on the order in which devices are connected.**

Additionally, more and more drivers use **dynamic values** for devices' **major/minor numbers**,
which makes it impossible to have static entries for the given devices, since these essential
characteristics may vary after a reboot.

**udev was created precisely to solve this problem.**

### Network card management ###
Many computers have multiple network cards (sometimes two wired inter-
faces and a wifi interface), and with hotplug support on most bus types, **the
2.6 kernel no longer guarantees fixed naming of network interfaces. But a user
who wants to configure their network in /etc/network/interfaces needs a
fixed name!**

It would be difficult to ask every user to create their own udev rules to address
this problem. This is why **udev** was configured in a rather **peculiar manner**; on
first boot (and, more generally, each time that a new network card appears)
**it uses the name of the network interface and its MAC address to create new
rules that will reassign the same name on subsequent boots. These rules are
stored in /etc/udev/rules.d/70-persistent-net.rules.**

This mechanism has some side effects that you should know about. Let's
consider the case of computer that has only one PCI network card. The net-
work interface is named eth0, logically. Now say the card breaks down, and
the administrator replaces it; the new card will have a new MAC address.
Since the old card was assigned the name, eth0, the new one will be assigned
eth1, even though the eth0 card is gone for good (and the network will not
be functional because /etc/network/interfaces likely configures an eth0 in-
terface). **In this case, it is enough to simply delete the /etc/udev/rules.d/
70-persistent-net.rules file before rebooting the computer. The new card
will then be given the expected eth0 name.**

### How udev works ###
When **udev** is notified by the kernel of the appearance of a new device, **it collects various infor-
mation on the given device by consulting the corresponding entries in /sys/**, especially those
that uniquely identify it (MAC address for a network card, serial number for some USB devices,
etc.).

Armed with all of this information, udev then consults all of the rules contained in **/etc/udev/
rules.d/** and **/lib/udev/rules.d/**.

In this process it decides how to **name the device**, what **symbolic links to create** (to give it alternative names), and what **commands to execute**. All of these files are consulted, and the rules are all evaluated sequentially (except when a file uses “GOTO” directives). Thus, there may be several rules that correspond to a given event.

The syntax of rules files is quite simple: each row contains **selection criteria and variable assign-
ments**. The **former are used to select events** for which there is a need to react, and **the latter
defines the action to take**. They are all simply separated with commas, and **the operator implic-
itly differentiates between a selection criterion** (with comparison operators, such as == or != )
or an assignment directive (with operators such as = , += or := ).

**Comparison operators are used on the following variables:**

- KERNEL : the name that the kernel assigns to the device;
- ACTION : the action corresponding to the event (“add” when a device has been added,
“remove” when it has been removed);
- DEVPATH : the path of the device's **/sys/entry**;
- SUBSYSTEM : the kernel subsystem which generated the request (there are many, but a
few examples are “usb”, “ide”, “net”, “firmware”, etc.);
- ATTR{attribut} : file contents of the attribute file in the **/sys/ $devpath /** directory of the
device. This is where you find the MAC address and other bus specific identifiers;

         /sys/devices/pci0000:00/0000:00:1c.2/0000:03:00.0/net/wlan0/address
         
- KERNELS , SUBSYSTEMS and ATTRS{attributes} are variations that will try to match the
different options on one of the parent devices of the current device;
- PROGRAM : delegates the test to the indicated program (true if it returns 0, false if not).
The content of the program's standard output is stored so that it can be reused by the
RESULT test;
- RESULT : execute tests on the standard output stored during the last call to PROGRAM.

The right operands can use pattern expressions to match several values at the same time. For
instance, ***** matches any string (even an empty one); **?** matches any character, and `[]` matches
the set of characters listed between the square brackets (or the opposite thereof if the first
character is an exclamation point, and contiguous ranges of characters are indicated like `a-z`).

Regarding the assignment operators, **= **assigns a value (and replaces the current value); in the
case of a list, it is emptied and contains only the value assigned. **:= **does the same, but prevents
later changes to the same variable. As for **+=** , it adds an item to a list. The following variables
can be changed:

- NAME : the device filename to be created in /dev/ . Only the first assignment counts; the
others are ignored;
- SYMLINK : the list of symbolic links that will point to the same device;
- OWNER , GROUP and MODE define the user and group that owns the device, as well as
the associated permission;
- RUN : the list of programs to execute in response to this event.

The values assigned to these variables may use a number of substitutions:

- $kernel or %k : equivalent to KERNEL ;
- $number or %n : the order number of the device, for example, for sda3 , it would be “3”;
- $devpath or %p : equivalent to DEVPATH ;
- $attr{attribute} or %s{attribute} : equivalent to ATTRS{attribute} ;
- $major or %M : the kernel major number of the device;
- $minor or %m : the kernel minor number of the device;
- $result or %c : the string output by the last program invoked by PROGRAM;
- and, finally, %% and $$ for the percent and dollar sign, respectively.

The above lists are not complete (they include only the most important parameters), but the
**udev(7)** manual page should be.

### A concrete example : Important ###

Let us consider the case of a simple USB key and try to assign it a fixed name. First, you must
find the elements that will identify it in a unique manner. For this, plug it in and run **udevadm
info -a -n /dev/sdc** (replacing /dev/sdc with the actual name assigned to the key).

**To create a new rule, you can use tests on the device's variables, as well as those of one of the
parent devices.** The above case allows us to create two rules like these:

        KERNEL=="sd?", SUBSYSTEM=="block", ATTRS{serial}=="M004021000001", SYMLINK+="
              usb_key/disk"
        
        KERNEL=="sd?[0-9]", SUBSYSTEM=="block", ATTRS{serial}=="M004021000001",
             SYMLINK+="usb_key/part%n"
             
**Once these rules are set in a file, named for example /etc/udev/rules.d/010_local.rules ,
you can simply remove and reconnect the USB key. You can then see that /dev/usb_key/disk
represents the disk associated with the USB key, and /dev/usb_key/part1 is its first partition.**

### Debugging udev's configuration ###
Like many daemons, udevd stores logs in **/var/log/daemon.log**. But it is not
very verbose by default, and it's usually not enough to understand what's hap-
pening. The **udevadm control --log-priority=info** command increases the
verbosity level and solves this problem. **udevadm control --log-priority=err**
returns to the default verbosity level.

## Power Management ##
The topic of power management is often problematic. Indeed, properly suspending the com-
puter requires that all the computer's device drivers know how to put them to standby, and that
they properly reconfigure the devices upon waking. Unfortunately, there are still many devices
unable to sleep well under Linux, because their manufacturers have not provided the required
specifications.

###Software suspend###
The soware suspend banner rallies several recent efforts to integrate reliable
hibernation under Linux, on disk or in memory. Recent kernels are relatively
reliable in that regard, when used in cooperation with tools of the uswsusp
package. Unfortunately the problems related to hibernation are not yet an-
cient history, and you should run tests on your hardware before puing too
much faith in its ability to wake from suspend.
For those who want to learn more about how standby works with ACPI,
Matthew Garrett has an excellent article about this in his blog.s

        http://www.advogato.org/article/913.html
        
### Advanced Power Management (APM) ###
APM (Advanced Power Management) control is present in all Debian kernels, but disabled by
default. To activate it,** you add the apm=on option to the kernel parameters passed at boot
time**. With LILO, you would add the append="apm=on" directive to the block indicating which
image to boot (in the /etc/lilo.conf file), and relaunch lilo . With GRUB2, you simply add
apm=on to the GRUB_CMDLINE_LINUX= variable in **/etc/default/grub** , and run **update-
grub** to regenerate the contents of the boot menu.

The apmd package provides a daemon that looks for events connected to energy management
(switching between AC and battery power on a laptop, etc.), and allows you to run specific com-
mands in response.

These days, APM is really only justified on older computers that do not support ACPI properly.
In all other cases, ACPI should be used.

### Modern power savings: Advanced Configuration and Power Interface (ACPI) ###
Linux supports ACPI (Advanced Configuration and Power Interface) — the most recent standard
in power management. More powerful and flexible, it is also more complicated to implement.
The acpid package is the counterpart to apmd for the ACPI world.

If you know that your BIOS correctly manages ACPI, then this should be preferred over APM
(removed upon update of the BIOS). When moving from one to the other, you must take care
to remove the apmd package, since keeping it alongside with acpid could cause problems (and
vice-versa)

### Graphics card and standby ###
The graphics card driver oen has a problem with standby. In case of trouble,
it is a good idea to test the latest version of the X.org graphics server.

### Apple and power management ###
On Apple Powerbooks (thus PowerPC processors), apmd should be replaced
with **pmud**.

## Laptop Extension Cards: PCMCIA ##
PCMCIA card drivers are built into the kernel as modules since kernel version 2.6.13. On a sys-
tem running Debian Squeeze, you simply have to install the user space support contained in the
pcmciautils package.

The **wireless-tools** package is also necessary for good management of Wifi cards.

Every time you connect or remove a card, the daemon configures or deconfigures it, by execut-
ing a script in the /etc/pcmcia/ directory, which gets its settings from the /etc/pcmcia/*.
opts files. These files have been slightly adapted to work with a Debian system; the configura-
tion of the network is delegated to ifup if the /etc/pcmcia/network.opts file does not take
care of it. The same is true for configuration of a wireless network, which can be specified in
/etc/network/interfaces instead of /etc/pcmcia/wireless.opts . The /usr/share/doc/
wireless-tools/README.Debian file also describes the syntax to use.

After this overview of basic services common to many Unix systems, we will focus on the envi-
ronment of the administered machines: the network. Many services are required for the net-
work to work properly. They will be discussed in the next chapter.