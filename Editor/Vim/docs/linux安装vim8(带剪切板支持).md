## Install dependency

sudo apt-get install libncurses5-dev libgnome2-dev libgnomeui-dev   libgtk2.0-dev libatk1.0-dev libbonoboui2-dev   libcairo2-dev libx11-dev libxpm-dev libxt-dev

## configure

	./configure --with-features=huge --enable-gui=gnome2  --enable-pythoninterp=yes

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


## Other

### linux install ack for ctrlsf plugin

	apt-get install ack-grep 
	
	or
	
	yum install ack


### linux install ctags for tarbar plugin

	apt-get install ctags
	
	or 
	
	yum install ctags-etags
