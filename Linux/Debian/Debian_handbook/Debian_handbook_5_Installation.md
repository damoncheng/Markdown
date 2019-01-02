## Installation ##  
  
- installation requires 56 MB of `RAM(Random Access Memory)` and least 650MB of hard drive space. All Falcot computers meet these criteria. Note, Howerver, that these figures apply to the installation of very limited system witout a graphic desktop. **A minimum of 512MB of RAM and 5GB of hard drive space are really recommanded for a basic office desktop workstation.**

## Installation Debian ##   

    A debian system can be installed from servral types of media, as long as the BIOS of the machine allow it. You can for instance boot with a CD-ROM, A USB key, or even though a network.
    
- Installing from  a CD-ROM/DVD-ROM
    
    The most widely used installation media is CD-ROM.
    
- Various CD-ROM have different purposes:

    - netinst(network installation) : contains the installer and the base Debian system; all other programes are then downloaded. only takes up 150 MB. 
    - buisiness or bizcard CD-ROM :  only provides the installer, all the Debian packages(including the base system) to be download,  since its image only take up 35MB.
    - complete images: 50 CD-ROMS(or eight DVD-ROMS or two bluray disks), offer all packages and allows for installation on a computer that has no Internet access. The Programes are divided among the disks according to their popularity and importance; **the first three disks will be sufficient for most installations; since they contain the most used software;**
    - the list of CD-ROM image
    
        http://www.debian.org/CD/index.html
        
- Booting from a USB key

    - You must first identify the peripheral name of the USB key(ex:/dev/sdb), the simplest means to do this is to check the messages issued by the kernel using the **dmesg** command.
    
    - copy the previously downloaded ISO image(for example debian-6.0.0-amd64-i386-netinst.iso). with the command **cat debian-6.0.0-amd64-i386-netinst.iso > /dev/sdb;sync**. 
    
    - refernce url
    
        http://www.debian.org/releases/stable/i386/ch04s03.html 
        
## Installing through Network Booting ##

- Many BIOSes allow booting directly from the network by downloading the kernel to boot. This method(which has serval names, such as PXE or TFTP boot) can be a life-saver if the computer
does not have a CD-ROM reader, or if the BIOS can't boot from such media.
     
   - step one : while booting the computer, the BIOS(or network card) issue a BOOTP/DHCP request to automatically acquire an IP address. When a BOOTP or DHCP server returns a response, it include a filename, as well as network settings. 
   
   - step two : After having configured the network, the client computer then issue a TFTP(Trivial File Transfer Protocol) requesgt for a file whose name was previously indicated. Once this file is acquired, it is executed as though it were a bootloader. 
   
- This then launches the Debian installation program, which is executed as though it were running from the hard drive, a CD-ROM, or a USB key.
   
- reference url
    
        http://www.debian.org/releases/stable/i386/ch05s01.html#boot-tftp
        http://www.debian.org/releases/stable/i386/ch04s05.html
            

## Other installation method ##

- When we have to deploy customized installations for a large number of computers, we generally
choose an automated rather than a manual installation method. Depending on the situation
and the complexity of the installations to be made, we can use FAI (Fully Automatic Installer,
described in Section 12.3.1, “Fully Automatic Installer (FAI)” (page 337)), or even a customized
installation CD with preseeding (see Section 12.3.2, “Preseeding Debian-Installer” (page 338)).


## Installing Step by Step : Here only note attention ##

- Installation alongside an existing Windows system

    http://ftp.debian.org/debian/tools/win32-loader/stable/
    
    http://www.goodbye-microsoft.com/
    
- Boot loader

    The bootloader is a low-level program that is responsible for booting the Linux
kernel just aer the BIOS passes off its control. To handle this task, it must
be able to locate the Linux kernel to boot on the disk. On i386/amd64 archi-
tectures, the two most used programs to perform this task are LILO, the older of the two,
and GRUB, a more modern challenge. isolinux and syslinux are alternatives frequently used to
boot from removeable media.

    - Each menu entry hides a specific boot command line, which can be configured as needed by
pressing the **TAB** key before validating the entry and booting. The “Help” menu entry displays
the old command line interface, where the **F1 to F10** keys display different help screens detailing
the various options available at the prompt. You will rarely need to use this option except in
very specific cases


- Configuring the Network

     If the local network is equipped with a DHCP server that you do not wish to use because you prefer to define a static IP address for the machine during installation, you can add the **netcfg/use_dhcp=false** option when booting from the CD-ROM. You just need to go to the designed menu entry by pressing **TAB** key and add the desired option before pressing the **ENTER** key.
   
- partitioning

    The advantage of dividing the file tree to many partitions : Users can not lock up the server by consuming all available hard drive space(they can only fill up /tmp and /home), the daemon data(especially logs) can no longer clog up the rest of the system.
    
    a journalized filesystem (such as ext3, ext4, btrfs, reserfs, or xfs) takes special measures to make it possible to return to a prior consistent state after an abrupt interruption without completely analyzing the entire disk(as well as the case with the ext2 system).**This functionality is carried out by filling in a journal that describes the operations to conduct prior to actually executing them. If an operate is interrupted, it will be possible to "replay" it from the journal. conversely, if an interruption occurs during an update of the journal, the last requested change is simply ignored; the data being written could be lost, but since the data on the disk has not changed, they have remained coherent. This is nothing more nor less more or less than a transactional mechanism applied to the filesystem. **
    
       - Shrinking a windows partition
       
         **The Debian installer allows this operation when using the manual mode for partitioning. You only need to choose the Windows partition and entire its new size(this works the same with the both FAT and NTFS partitions).**
         
       - virtual memory, swap
       
        Virtual memory allows the linux kernel, when lacking sufficeint memory(RAM), to free a bit of storage by storing the parts of the RAM that have been inactive for some time on the swap partition of the hard disk.
        
        To simulate the additional memory, Windows uses a swap file that is directly contained in a filesystem. Conversely, Linux uses a partition dedicated to this purpose, hence the term "swap partition".
        
     - the use way of parttion
        
        * format it and include it in the file tree by choosing a mount point.
        * use it as a swap partition
        * make it into a 'physical volume for encryption' (to product the confidentiality of data on certain partitions, see blow)
        * make it a "physical volume for LVM"(this concept is discussed in greater detail later in this charapter)
        * use it as a RAID device(see later in this chapter)
        * or the choice not to use it, and therefore leave it unchanged.
     
     - Configuraing Multidisk Devices(Software RAID)
     
        Level 1 RAID keeps a simple, identical copy(mirror) of a hard drive on another drive
        
           - step one : creating two partitions of identical size located on two different hard drives, and to label them "physical volume for RAID"

           - step two : choose "configure software RAID" in the partitioning tool to combine these two partitions into a new virtual disk and select "Create MD device" in the configration screen.
                
        Level 5 RAID splits redundant data over several disks, thus allowing the complete reconstruction of a failing drive.
        
    - LVM allows you to create "virtual" partitions that span over several disks.The benefits are twofold: the size of the partitions are no longer limited by individual disks by their cumulative volume, and you can at any time increase the size of an existing partition by adding an additional disk when needed.
    
    
        The technique works in a very simple way: each volume, whether physical or logical, is split into blocks of the same size, which are made to corresponed by LVM, The addition of a new disk will cause the creation of a new physical volume, and these new blocks can be associated to any volume group. All of the partitions in the volume group that is thus expanded will have additional space into which they can extend.
     
     
    - Setting up Encrypted Partitions
    
        - enctypted swap partition
        
        When an encrypted partiton is used, the encryption key is stored in memory(RAM), Since retriving this key allows the decryption of the data, it is of utmost importance to avoid leaving a copy of this key that would be accesible to the possible thief of the computer or hard drive, or maintence thech-nician. This however something that can easily occur with a laptop. since when hibernating the contents of RAM is stored on the swap partition. If this partition isn't encrypted, the thief may access the key and use it to decrypt the data from the encrypted partitions. **This is why, when you use encrypted partitions, it is impreative to also encrypt the swap partition.**
        
        The Debian installer will warn the user if they try to make an encrypted partition while the swap parttions isn't encrypted.
        
        In most cases, this partition is used as a physical volume for LVM so as to protect serveral partions(LVM logical volumes) with the same encryption key, including the swap partition(see sidebar)
        
- Installing the Base System

    "base system" includes the **dpkg** and **apt** tools, which manage Debian package, as well as the utili-ties necessary to boot the system and start using it.The Debian package are read from the disk(if using a netinst CD or a complete CD-/DVD-ROM) or downloaded(when using a buisinesscard isntallation disk)  
    
- Configuring the package manager(apt)

    An HTTP proxy is a server that forwards an HTTP request for network users. It sometimes helps to speeds up downloads by keeping a copy of files that have been transterred through it (we then speak of proxy/cache). In some cases, it is the only means of accessing an external web server; in such cases, it is essential to answer the corresponding question during installation for the programe to be able to download the Debian packages through it.
    
    **Squid is the name of the server soware used by Falcot Corp to offer this
service.**

- Debian Package Popularity Contest

- Installing the GRUB bootloader

    The bootloader is the first program started by BIOS. This programe loads the Linux kernal into memory and then executes it.
    
    - when installation windows after debian, the bootlader will be erased. You would then have to boot the Debian installtaion system in **rescue** mode to set up a less exclusive bootloader.
    
        http://www.debian.org/releases/stable/i386/ch08s07.html
        
    - Bootloaders and architecture
    
        LILO and GRUB, which are mentioned in this chapter, are bootloaders for i386 and amd64 architecture. If you install Debian on another architecure, you will need to use another bootloader. Among others, we can cite **yahoo** or **quik** for powerpc, **silo** for sparc, "elilo" for ia64, **aboot** for alpha, **arcboot** for mips, **atari-bootstrap** or **vme-lilo** for m68k.
        
         
- installing additional software

    The two most frequently used tools(which are installed if the "Graphical desktop environment" profile was chosen) are **apt(accessible from the command line)** and **synaptic(System->Administration)->Synaptic Package Manager**
    
    **Aptitude is an interface to APT in full-screen text mode.**
    
    
    - Package dependencies, conflicts:
    
         **In the Debian package lingo, a "dependency" is another package necessary for the proper functioning of the package in question. Conversely, a "conflict" is a package that can not be installed side-by-side with another.**
         
- Upgrading the System

    A first aptitude safe-upgrade (a command used to automatically update installed programs)
is generally required, especially for possible security updates issued since the release of the
latest Debian stable version. These updates may involve some additional questions through
debconf , the standard Debian configuration tool. For further information on these updates
conducted by aptitude , please refer to Section 6.2.3, “System Upgrade” (page 109).
     
        
     
         
         
         
