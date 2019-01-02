## set mysql default utf8 ##

### set default encode utf8 in /etc/mysql.my ###
`[client]`

default-character-set=utf8

`[[mysqld]]`

default-storage-engine=INNODB
character-set-server=utf8
collation-server=utf8_general_ci

### create database ###

the create database operate must after setting default encode, otherwise, the `character_set_database` will be encode before settings.

### show encode ###

show variables like "char%"

##  启动、停止、重启 MySQL 常见的操作方法(<a href="http://blog.csdn.net/aeolus_pu/article/details/9300205">转载</a>) ##

### 一、启动方式 ###

1、使用 service 启动：service mysqld start

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld start

3、使用 mysqld_safe 启动：mysqld_safe &

### 二、停止 ###
 
1、使用 service 启动：service mysqld stop

2、使用 mysqld 脚本启动：/etc/inint.d/mysqld stop

3、mysqladmin shutdown

### 三、重启 ###

1、使用 service 启动：service mysqld restart

2、使用 mysqld  脚本启动：/etc/inint.d/mysqld restart

官方推荐使用mysqld_safe，使用mysqld_safe启动，会监控mysql进程，如果mysql进程关闭，自动重启mysql进程。

## 在Linux环境下mysql的root密码忘记解决方法(<a href="http://lxsym.blog.51cto.com/1364623/477027">转载</a>) ##

### MySQL密码的恢复方法之一 ###
1．首先确认服务器出于安全的状态，也就是没有人能够任意地连接MySQL数据库。 因为在重新设置MySQL的root密码的期间，MySQL数据库完全出于没有密码保护的 状态下，其他的用户也可以任意地登录和修改MySQL的信息。可以采用将MySQL对外的端口封闭，并且停止Apache以及所有的用户进程的方法实现服务器的准安全状态。最安全的状态是到服务器的Console上面操作，并且拔掉网线。

2．修改MySQL的登录设置： 
vi /etc/my.cnf 
在[mysqld]的段中加上一句：skip-grant-tables 保存并且退出vi。

3．重新启动mysqld 
/etc/init.d/mysqld restart  ( service mysqld restart )

4．登录并修改MySQL的root密码
mysql> USE mysql ; 
mysql> UPDATE user SET Password = password ( 'new-password' ) WHERE User = 'root' ; 
mysql> flush privileges ; 
mysql> quit

5．将MySQL的登录设置修改回来 
vi /etc/my.cnf 
将刚才在[mysqld]的段中加上的skip-grant-tables删除 
保存并且退出vi。

6．重新启动mysqld 
/etc/init.d/mysqld restart   ( service mysqld restart )
7．恢复服务器的正常工作状态
将步骤一中的操作逆向操作。恢复服务器的工作状态。
 
### MySQL密码的恢复方法之二 ###
如果忘记了MySQL的root密码，可以用以下方法重新设置：
1. KILL掉系统里的MySQL进程； 
killall -TERM mysqld

2. 用以下命令启动MySQL，以不检查权限的方式启动； 
safe_mysqld --skip-grant-tables &

3. 然后用空密码方式使用root用户登录 MySQL； 
mysql -u root

4. 修改root用户的密码； 
mysql> update mysql.user set password=PASSWORD('新密码') where User='root'; 
mysql> flush privileges; 
mysql> quit 
重新启动MySQL，就可以使用新密码登录了
 
### MySQL密码的恢复方法三 ###
有可能你的系统没有 safe_mysqld 程序(比如我现在用的 ubuntu操作系统, apt-get安装的mysql) , 下面方法可以恢复
1. 停止mysqld； 
/etc/init.d/mysql stop
(您可能有其它的方法,总之停止mysqld的运行就可以了)

2. 用以下命令启动MySQL，以不检查权限的方式启动； 
mysqld --skip-grant-tables &

3. 然后用空密码方式使用root用户登录 MySQL； 
mysql -u root

4. 修改root用户的密码； 
mysql> update mysql.user set password=PASSWORD('newpassword') where User='root'; 
mysql> flush privileges; 
mysql> quit 
重新启动MySQL
/etc/init.d/mysql restart
就可以使用新密码 newpassword 登录了。

### mysql创建用户和授权实例 ###
    mysql> CREATE USER 'finley'@'localhost' IDENTIFIED BY 'some_pass';
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'finley'@'localhost'
        ->     WITH GRANT OPTION;
    mysql> CREATE USER 'finley'@'%' IDENTIFIED BY 'some_pass';
    mysql> GRANT ALL PRIVILEGES ON *.* TO 'finley'@'%'
        ->     WITH GRANT OPTION;
    mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin_pass';
    mysql> GRANT RELOAD,PROCESS ON *.* TO 'admin'@'localhost';
    mysql> CREATE USER 'dummy'@'localhost';

    mysql> SHOW GRANTS FOR 'admin'@'localhost';
    +-----------------------------------------------------+
    | Grants for admin@localhost                          |
    +-----------------------------------------------------+
    | GRANT RELOAD, PROCESS ON *.* TO 'admin'@'localhost' |
    +-----------------------------------------------------+

    mysql> SHOW CREATE USER 'admin'@'localhost'\G
    *************************** 1. row ***************************
    CREATE USER for admin@localhost: CREATE USER 'admin'@'localhost'
    IDENTIFIED WITH 'mysql_native_password'
    AS '*67ACDEBDAB923990001F0FFB017EB8ED41861105'
    REQUIRE NONE PASSWORD EXPIRE DEFAULT ACCOUNT UNLOCK
