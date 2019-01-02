#!/usr/bin/env bash

ip_list=`echo $IP_LIST`

echo "#_---------ip_list : $ip_list"
[ "$ip_list" == "-" ] && echo "please enter ip list" && exit 2

#monitor jenkins heart
./listen.sh $ip_list


