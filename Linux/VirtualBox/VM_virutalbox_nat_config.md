该教程是为了虚拟环境下，保证网络环境稳定下，能够进行外网访问

### 连接方式 ###

NAT 网络


### 静态IP配置 ###

- Centos

		auto lo
		iface lo inet loopback
		
		auto eth0
		iface eth0 inet static
		address 10.0.2.101
		netmask 255.255.255.0
		gateway 10.0.2.1
		broadcast 10.0.2.255


### 域名配置 ###

	nameserver 8.8.8.8
