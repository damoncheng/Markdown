## python2.7源代码安装 ##
按说明安装，安装后，会覆盖可执行文件路径 /usr/local/bin/python

## pip安装 ##
按说明安装

## svn安装:subversion源码安装 ##

按说明安装后，将subversion内的apr文件拷贝到/usr/local下提供为后面安装pysvn做准备，svn安装完成后, 运行ldconfig加载svn相关动态链接库，为后面pysvn做准备。

## pysvn安装 ##
按说明安装

##  重做mod_wsgi.so 模块 ##
./configure --with-apxs=/usr/local/apache2/bin/apxs --with-python=/usr/local/bin/python 
该命令会自动生存mod_wsgi.so文件到/usr/local/apache2/modules/目录下,重启apache就可生效(结合日志进行观察)

## mod_wsgi.so安装细节文档 ##
64 bit系统下mod_wsgi.so模块会安装失败，需要借助下面的链接来安装更新版本的mod_wsgi.so模块:
https://modwsgi.readthedocs.io/en/develop/user-guides/quick-installation-guide.html

configure带fpc标志位:./configure --enable-shared CFLAGS=-fPIC

pip安装MySQL-python: pip2.7 install MySQL-python
