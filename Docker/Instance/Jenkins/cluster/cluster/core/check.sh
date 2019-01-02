#!/bin/bash

#同步目录不能为集群目录的父目录

cluster_dir=$1
ipfile=$2 
logfile=$3

IFS=$'\n'
ip_list=`cat $ipfile`

for one_ip_list in $ip_list
do

    eval `echo $one_ip_list | awk '{printf("src=%s",$1)}'`
    if [[ $src =~ ^$cluster_dir.*$ ]];then

        date  >> $logfile
        echo "$cluster_dir can't be in $src"  >> $logfile
        echo >> $logfile
        echo >> $logfile
        exit 2

    fi

    if [[ $cluster_dir =~ ^$src.*$ ]];then

        date  >> $logfile
        echo "$src can't be in $cluster_dir"  >> $logfile
        echo >> $logfile
        echo >> $logfile
        exit 2

    fi


done

exit 0



