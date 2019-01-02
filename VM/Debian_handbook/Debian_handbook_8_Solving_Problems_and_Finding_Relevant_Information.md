# Solving Problems and Finding Relevant Information #

For an administrator, the most important skill is to able to cope with any situation, known or unknown. This chapter gives a number of methods that will - hopefully - allow you to isolate the cause of any problem that you will encounter, so that you may be able to resolve them.

## Documentation Sources ##
Before you can understand what is really going on when there is a problem, you need to know the theoretical role played by each program involved in the problem. To do this, the best reflex to have is consult their documentation; **but since these documentations are many and widely dispersed, you should know all the places where they can be found.**

### Manual Pages ###

#### RTFM ####

The acronym stands for "Read the F**king Manual", but can also be expanded in a friendlier variant, "Read the Fine Manual". This phrase is sometimes used in(terse) responses to questions from newbies. It is rather abrupt, and betrays a certain annoyance at a question asked by someone who has not even bothered to read the documentation. Some say that this classic response is better than no response at all(since it indicates that the documentation contains the information sought), or than a more verbose and angry answer.

In any case, if someone responds "RTFM" to you, it is often wise not to take offense. Since this answer may be perceived as vexing, you might want to try and avoid receiving it. If the information that you need is not in manual, which can happen, you might want to say so, perferably in your initial question. **you should also describe the various steps that you have personally taken to find information before you raised a question on a forum. You can, before using forums, follow a few common sense recommendations, which have been listed by Eric Raymond.**

    http://catb.org/~esr/faqs/smart-questions.html
    
#### The shell, a command line interpreter ####

A command line interpreter, also called a "shell", is a program that executes commands that are either entered by the user or stored in a script. In inter-active mode, it displays a prompt(usually ending in $ for a normal user, or by # for an administrator) indicating that it is ready to read a new command. **Appendix B, Short Remedial Course(Page 437) describes the basics of using the shells.**


The default and most commonly used shell is **bash**(Boursh Again SHell), but there are others, **including  dash, csh, tcsh and zsh.**

Among other things, most shells offer helping during input at the prompt, such as the completion of command or file names(which you can generally activate by pressing the tab key). or recalling previous commands(history management).

#### Man pages are organized in numbered sections ####

Man pages not only document programes accessible from the command line, but also configuration files, system calls, C library functions, and so forth. Sometimes names can collide. For example, **shell's read** command has the same name as the **system call read**. **This is why manual pages are organized in numbered sections:**

- `1.` commands that can be executed from the command line; 

- `2.` system calls(functions provided by the kernel);
    
- `3.` library functions(provided by system libraries);
    
- `4.` devices(under UNIX, these are special files, usually placed in the /dev/directory);
    
- `5.` config files(formats and conventions);
    
- `6.` games;
    
- `7.` sets of macros and standards;
    
- `8.` system administrator commands;
    
- `9.` kernel routines;

It is to specify the section of the manual page that you are looking for: to view the documentation for the **read** system call, you would type `man 2 read`. **When no section is explicitly specified, the first section that has a manual page with the requested name will be shown**. Thus, `man shadow` returns `shadow(5)` because there are no manual pages for shadow in sections 1 to 4.

#### whatis ####
If you do not want to look at the full manual page, but only a short description to confirm that it is what you looking for, simply enter **whatis command**.

        $ whatis scp
        scp (1)- secure copy (remote file copy program)
    
This short description is included in the NAME section at the begining of all manual pages.

of course, if you do not know the names of the commands, the manual is not going to be of much use to you, This is the purpose of the **apropos** commands, which helps you conduct a search in the manual page, or more specifically in their short descriptions. Each manual page begins essentially with a one line summary. **apropos returns a list of manual pages that mention the keyword(s) requested. If you choose them well, you will find the name of the command that you need.**

 
        $ apropos "copy file"    
        cp(1) - copy files and directories
        cpio(1) - copy files to and from archives
        hcopy(1) - copy files from or to an HFS volume
        install(1) - copy files and set attributes
        
#### Browsing by following links ####

Many manual pages have a "SEE ALSO" section, usually at the end. It refers to other manual pages relevant to similar commands, or to external documentation. In this way, It is possible to find relevant documentation even when the first choice is not optimal.


#### The other way to see manual pages ####

The man command is not the only means of consulting the manual pages, since konqueror (in
KDE) and yelp (under GNOME) programs also offer this possibility. **There is also a web interface,
provided by the man2html package, which allows you to view manual pages in a web browser.
On a computer where this package is installed, use this URL:**

        http://localhost/cgi-bin/man/man2html
        
This utility requires a web server. This is why you should choose to install this package on one of your servers: all users of the local network could benefit from this service(including non-linux machines), and this will allow you not to set up an HTTP server on each workstation. If your server is also accessible from other networks. it mays be desireable to restrict access to this service only to users of the local network.

#### Required man pages ####
Debian requires each program to have a manual page. If the upstream author does not provide one, the Debian package maintainer will usually write a minimal page that will at the very least direct the reader to the location of the original documentation.


### info Documents ###

The GUN project has written manuals for the most of its programs in the **info** format; this is why many manual pages refer to the corresponding `info` documentation. **This format offers some advantages, but the programes to view these documents is also slightly more complex.**

It is of course called **info**, and it takes the name of the "node" to be consulted as argument. The **info** document has a hierarchical structure. and if you invoke info without parameters, it will display a list of the nodes available at the first level. Usually, nodes bear the name of corresponding commands. 

The navigation controls in the documentation are not particularly intuitive. **The best method to familiarize yourself with the program is probably to invoke it, the enter h(for "help"), and then follow the instructions to learn thgrough practice. **

Alternatively, you could also use a graphical browser, which is a lot more user-friendly. Again, **konquerror** and **yelp** work; the **info2www** also provides a web interface.

        http://localhost/cgi-bin/info2www
        
Note that the **info** system does not allow traslation, unlike the man page system. **info** documents are thus always in english However, when you ask the **info** program to display a non-existing info page, it will fall back on the man page by the same name(if it exists), which might be translated.

### Specific Documentation ###

Each package includes its own documentation. Even the least well documented programs generally have a **README** file containing some interesting and/or important information. This documentation is installed in the /usr/share/doc/package/ directory(where package represents the name of the package), **If the documentation is partitularly large**, it may not be included in the program's main package, but might be offloaded to a dedicated package which is usually named **package-doc**. The main package generally recommends the documentation package so that you can easily find it.

In the **/usr/share/doc/package** directory there **are also some files provided by Debian** and which complete the documentation by specifying the package's particularities or improvements compared to a traditional of the software. The **READEME.Debian** file also indicates all of the adaptations that were made to comply with the Debian Policy. The **changelog.Debian.gz** file allows the user to follow the modifications made to the package over time : **it is very useful to try to understand what has changed between two installed versions that do not have the same behavior**. Finally, there is sometimes a **NEWS.Debian.gz** file which documents the major changes in the program that may directly concern the administrator.


### Websites ###

In most cases, free software programs have websites that are used to distribution it and to unite the community of its developers and users. These sites are frequently loaded with relevant information in various forms: official documentation, FAQ(frequently Asked Questions), mailing list archives, etc. Often, problems that you may have already been the subject of many questions; The FAQ  or mailling list archives may have a solution for it. **A good mastery of search engine will prove immensely valuable to find relevant pages quickly(by restricting the search to the internet domain or sub-domain dedicated to the program).**

If the serach returns too many pages or if the results do not match what you seek, you can add the keyword **Debian** to limit result and target relevant information.


#### From error to solution ####

If the software returns a very specific error message, **enter it into the search engine(between double quotes,", in order to search not for individual key-words, but for the complete phrase)**.  In most cases, the first link returned will contains the answer that you need.

In other cases, you will get very general errorrs, such as "Permission denied". In this case, it is best to check the permissions of the elements involved(files, userID, groups, etc.)


If you do not know the address for the software's website, there are various means of getting it. 

- First, check if there is a Homepage field in the package's meta-information(**apt-cache show package**). Alternately, the package description way contains a link to the program's official website. 

- If no URL is indicated, look at **/usr/share/doc/package/copyright**. The Debian maintainer generally indicates in this file where they got the program's source code, and this is likely to be the website that you need to find.    

- If at this stage your search is still unfruitful, consult a free software directory, such as Freshmeat.net or Framasoft, or search directly with a search engine, such as Google or Yahoo.

        http://freshmeat.net/
        
        http://framasoft.org/
        
        https://sourceforge.net/   (freshmeat reccommand)
        

- You might also want to check the **Debian wiki**, a collaborative website where anybody, even simple visitors, can make suggestions directly from their browsers. It is used as much by developers so as to design and specify their projects, as by users who share their knowlegeby writing documents collaboratively.

        http://wiki.debian.org/
        
        
### Tutorials(HowTo) ###

A how to is a documentation that describes, in concrete terms and step by step, how to reach a predefined goal. The covered goals are relatively varied, but often technical in nature: for example, setting up IP Masquerading, configuring software RAID, installing a Samba server, etc.
These documents often attempt to cover all of the potential problems likely to occur during the
implementation of a given technology.

Many such tutorials are managed by the Linux Documentation Project(LDP), whose website hosts all of these documents:

        http://www.tldp.org/ 
        
To view them locally, just install the **doc-linux-html** package. Local HTML versions will then be available in the **/usr/share/doc/HOWTO/** directory.

To view them locally, just install the doc-linux-html package. Local HTML versions will then be
available in the /usr/share/doc/HOWTO/ directory.
Take these documents with a grain of salt. They are often several years old; the information they
contain is sometimes obsolete. This phenomenon is even more frequent for their translations,
since updates are neither systematic nor instant after the publication of a new version of the
original documents. This is part of the joys of working in a volunteer environment and without constraints...


### Common Procedures ###
The purpose of this section is to present some general tips on certain operations that an ad-
ministrator will frequently have to perform. These procedures will of course not cover every
possible case in an exhaustive way, but they may serve as starting points for the more difficult
cases.


#### Configuring a Program ####

When you want to configure an unkown package, you must proceed in stages.

- First, you should read what the package maintainer has documented. Reading **/usr/share/doc/package/README.debian** will indeed allow you to learn of specific provisions made to simplify the use of the software.  It is sometimes essential in order to understand the differences from the original behavior of the program, as described in the general documentation, such as howtos. Sometimes this file also details the most common errors in order for you to avoid wasting time on common problems.

- Then, you should look at the software's official documentation — refer to the previous section
to identify the various existing documentation sources. The command **dpkg -L package** gives
a list of files included in the package; you can therefore quickly identify the available documen-
tation (as well as the configuration files, located in /etc/ ). **dpkg -s package** produces the
package headers and shows any possible recommended or suggested packages; in there, you
can find documentation or a utility that will ease the configuration of the software.


- Finally, the configuration files are often self-documented by many explanatory comments de-
tailing the various possible values for each configuration setting. So much so that it is sometimes
enough to just choose a line to activate from among those available. In some cases, examples of
configuration files are provided in the /usr/share/doc/ package /examples/ directory. They
may serve as a basis for your own configuration file.


#### Location of examples ####
All examples must be installed in the /usr/share/doc/ package /examples/
directory. This may be a configuration file, program source code (an ex-
ample of the use of a library), or a data conversion script that the admin-
istrator can use in certain cases (such as to initialize a database). If the
example is specific to a particular architecture, it should be installed in
/usr/lib/ package /examples/ and you should create a link pointing to that
file in the /usr/share/doc/ package /examples/ directory.

#### Monitoring what Daemons Are Doing ####
A daemon somewhat complicated one's understanding of a situation, since it does not interact directly with the administrator. To check that a daemon is actually working, you need to test
it. For example, to check the Apache (web server) daemon, test it with an HTTP request.


To Allow such tests, each daemon generally records everything that it does, as well as any errors that it encounters, in what are called “log files” or “system logs”. Logs are stored in /var/log/
or one of its subdirectories. To know the precise name of a log file for each daemon, see its
documentation. Note: a single test is not always sufficient if it does not cover all the possible
usage cases; some problems only occur in particular circumstances.

#### The rsyslogd daemon ####
rsyslogd is special: it collects logs (internal system messages) that are sent
to it by other programs. Each log entry is associated with a subsystem (e-
mail, kernel, authentication, etc.) and a priority, two bits of information that
rsyslogd processes to decide on what to do. The log message may be recorded
in various log files, and/or sent to an administration console. The details are
defined in the **/etc/rsyslog.conf** configuration file (documented in the man-
ual page of the same name).

**Certain C functions, which are specialized in sending logs, simplify the use
of the rsyslogd daemon. However some daemons manage their own log files
(this is the case, for example, of samba , that implements Windows shares on
Linux).**


#### Daemon ####
A daemon is a program that is not explicitly invoked by the user and that stays
in the background, waiting for a certain condition to be met before performing
a task. Many server programs are daemons, a term that explains that the letter
**“d” is frequently present at the end of their name ( sshd , smtpd , httpd , etc.).**



**Any preventive operation begins by regularly consulting the most relevant server logs. You
can thus diagnose problems before they are even reported by disgruntled users.** Indeed users
may sometimes wait for a problem to reoccur over several days before reporting it. You can
use a specific tool to analyze the content of the larger log files. You can find such utilities for
web servers (such as analog , awstats , webalizer for Apache), for FTP servers, for proxy/cache
servers, for firewalls, for e-mail servers, for DNS servers, and even for print servers. Some of
these utilities operate in a modular manner and allow analysis of several types of log files. This
is the case of lire or also modlogan . Other tools, such as logcheck (a software discussed in
Chapter 14, Security (page 374)), scan these files to search for alerts to be dealt with.


#### Asking for Helping on a Mailing List ####

If your various searches haven't helped you to get to the root of a problem, it is possible to get
help from other, perhaps more experienced people. This is indeed the purpose of the debian-
user@lists.debian.org mailing list. **As with any community, it has rules that need to be followed.
Before asking any question, you should check that your problem isn't already covered by recent
discussions on the list or by any official documentation.**

        http://wiki.debian.org/DebianMailingLists
        http://lists.debian.org/debian-user/
        
#### Reading a list on the Web ####

For high volume mailing lists, such as **debian-user@lists.debian.org**, it may
be worthwhile to go through them as a discussion forum (or newsgroup).
Gmane.org allows consultation of the Debian lists in this format. The list
mentioned above is available at:

        http://dir.gmane.org/gmane.linux.debian.user
        
#### Netiquette applies ####
n general, for all correspondence on e-mail lists, the rules of Netiquette should
be followed. This term refers to a set of common sense rules, from common
courtesy to mistakes that should be avoided.

        http://tools.ietf.org/html/rfc1855
        

Once you have met those two conditions, you can think of describing your problem to the mail-
ing list. Include as much relevant information as possible: 
    
- **various tests conducted**, 
- **documenta-tion consulted**, 
- **how you attempted to diagnose the problem**, 
- **the packages concerned or those that may be involved**, 

etc. Check the Debian Bug Tracking System (BTS, described in sidebar
“Bug tracking system” (page 14)) for similar problems, and mention the results of that search,
providing links to bugs found. BTS starts on:

        http://www.debian.org/Bugs/index.html
        

The more courteous and precise you have been, the greater your chances are of getting an an-
swer, or, at least, some elements of response. If you receive relevant information by private
e-mail, think of summarizing this information publicly so that others can benefit. Allow the
list's archives, searched through various search engines, to show the resolution for others who
may have the same question.


#### Reporting a Bug When a Problem Is Too Difficult ####

If all of your efforts to resolve a problem fail, it is possible that a resolution is not your respon-
sibility, and that the problem is due to a bug in the program. **In this case, the proper procedure
is to report the bug to Debian or directly to the upstream developers.** To do this, isolate the
problem as much as possible and create a minimal test situation in which it can be reproduced.
If you know which program is the apparent cause of the problem, you can find its correspond-
ing package using the command, **dpkg -S file_in_question**. Check the Bug Tracking System 

(**http://bugs.debian.org/package**) to ensure that the bug has not already been reported. You
can then send your own bug report, using the **reportbug** command, including as much infor-
mation as possible, especially a complete description of those minimal test cases that will allow
anyone to recreate the bug.
The elements of this chapter are a means of effectively resolving issues that the following chap-
ters may bring about. Use them as often as necessary !


