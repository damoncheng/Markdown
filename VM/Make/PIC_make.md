step one : CFLAGS="-fPIC"  ./configure --enable-shared --prefix=/usr/local/appname

step two : make

step three : make install

step four : ln -s /usr/local/appname/bin/app /usr/bin

step five : add /usr/local/appname/lib  to  /etc/ld.so.conf.d/appname.conf
            and ldconfig
            
