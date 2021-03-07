## Install dependency

sudo apt-get install libncurses5-dev libgnome2-dev libgnomeui-dev   libgtk2.0-dev libatk1.0-dev libbonoboui2-dev   libcairo2-dev libx11-dev libxpm-dev libxt-dev

## configure

	export LDFLAGS="-rdynamic"

	./configure --with-features=huge --enable-python3interp  --with-python3-config-dir=/usr/local/python3/lib/python3.6/config-3.6m-x86_64-linux-gnu --enable-multibyte --enable-cscope

## make and check

	make -j8
	src/vim --version

you will see +clipboard feature enabled

## install

	make install

## alter default vim version

To make it default You can uninstall the vim in your system first and install your. Alternatively, following the following instructions to make your newly build one default

To make newly installed version “/usr/local/bin/vim” the default one, we’ll use “update-alternatives”.

	sudo update-alternatives --install "/usr/bin/vim" "vim" "/usr/local/bin/vim" 1
	sudo update-alternatives --install "/usr/bin/vi" "vi" "/usr/local/bin/vim" 1
	
	sudo update-alternatives --config vim
	sudo update-alternatives --config vi
	sudo update-alternatives --config gvim

ls -lah /usr/bin/vim to check it's a link to your new vim


## plugins

### linux install ack for ctrlsf plugin

	apt-get install ack-grep 
	
	or
	
	yum install ack


### linux install ctags for tarbar plugin

	apt-get install ctags
	
	or 
	
	yum install ctags-etags
	
### linux install YouCompleteMe

- complie python3 with --enable-shared
	
	./configure --prefix=/usr/local/python3 --enable-optimizations --enable-shared

	make

	make install
	
	echo "/usr/local/python3/lib" >> /etc/ld.so.conf
	
	ldconfig 
	
- install ~/.vim/bundle/YouCompleteMe

	https://github.com/ycm-core/YouCompleteMe
	
- 解决libc.so.6: version `GLIBC_2.18' not found问题

	运行：strings /lib64/libc.so.6 |grep GLIBC_
	
	下载：wget http://mirrors.ustc.edu.cn/gnu/libc/glibc-2.18.tar.gz
	
	解压：tar -zxvf glibc-2.18.tar.gz
	
	进入解压文件夹，创建文件夹build：
	
		mkdir build
		cd build
		
	运行configure配置，make，sudo make install
	
		../configure --prefix=/usr
		make -j4
		sudo make install
