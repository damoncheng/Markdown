#!/bin/bash

source $1

IFS=$'\n'
ip_list=`cat $ipfile`
exclude=`$cluster_dir/core/exclude.sh $excludefile`

#echo $ip_list

echo -n $$ > $pidfile

for one_ip_list in $ip_list
do
{

    eval `echo $one_ip_list | awk '{printf("src=%s;ip=%s;dest=%s",$1,$2,$3)}'`

    if ! [[ $src =~ ^/.* ]];then
      continue
    elif  [[ $ip =~ ^[[:space:]]*$ ]];then
      continue
    elif  [[ $dest =~ ^[[:space:]]*$ ]];then
      continue
    fi

    $log_file $logdir/log 
    log_time=`date +%F_%H-%M-%S`
    $log_file $logdir/log "#$log_time"
    $log_file $logdir/log "$one_ip_list is actived"
    $log_file $logdir/log 

    inotifywait -mrq --timefmt '%yyyy-%m-%d %H:%M:%S' --format '%T %w%f%e' -e close_write,attrib,move,create,delete $src \
    | while read files
    do

        log_prefix=`date +%F`
        log_time=`date +%F_%H-%M-%S`
        $log_file $logdir/${log_prefix}_rsync_log_${ip}_${dest} "#$log_time"

      	$syncfile $user $src $ip $dest $log_file $log_prefix $logdir $exclude 

        $log_file $logdir/${log_prefix}_rsync_log_${ip}_${dest} "$src-to-$ip-$dest : ${files} was rsyncd by shell." 
	$log_file $logdir/${log_prefix}_rsync_log_${ip}_${dest} 
	$log_file $logdir/${log_prefix}_rsync_log_${ip}_${dest} 
        
        #log clear
	$clear_log_file $logdir $ip $dest $clear_day

    done

} &
done

wait

