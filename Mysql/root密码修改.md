## root密码修改 ##

方法1： 用SET PASSWORD命令

        mysql -u root

        mysql> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('newpass');

方法2：用mysqladmin

        mysqladmin -uroot password "newpass"

        如果root已经设置过密码，采用如下方法

        mysqladmin -uroot -ppassword  "newpass"

方法3： 用UPDATE直接编辑user表

        mysql -u root

        mysql> use mysql;

        mysql> UPDATE user SET Password = PASSWORD('newpass') WHERE user = 'root';

        mysql> FLUSH PRIVILEGES;

在丢失root密码的时候，可以这样

        mysqld_safe --skip-grant-tables&

        mysql -u root mysql

        mysql> UPDATE user SET password=PASSWORD("new password") WHERE user='root';

        mysql> FLUSH PRIVILEGES;
        
注意：

1. 一定要先kill掉mysql server进程

2. This function was removed in MySQL 8.0.11

- if you in skip-grant-tables mode in mysqld_safe:

        UPDATE mysql.user SET authentication_string=null WHERE User='root';
        FLUSH PRIVILEGES;
        exit;

- not in skip-grant-tables mode just in mysql:

        ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'yourpasswd';

