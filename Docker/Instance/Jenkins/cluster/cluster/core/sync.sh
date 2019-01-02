#!/bin/bash

user=$1
src=$2
ip=$3
dest=$4
logfile=$5
logprefix=$6
logdir=$7
exclude=$8

#echo $exclude
#exit 0

log_data=`rsync -r -v -l -H -p -o -g -D -t -S -u --delete --contimeout=1 --password-file=/etc/rsyncd.secrets  $exclude  \
      $src $user@$ip::$dest` 

echo "`date`=>$ip : $log_data"

#$logfile $logdir/${logprefix}_rsync_log_${ip}_${dest} "$log_data"

