#!/usr/bin/env bash

#!/bin/sh

while true
do 

   echo "`date` : $# : $@"
   if [ -f /tmp/jenkins-timer ];then
	   jenkins_last_heart=`cat /tmp/jenkins-timer`
	   now=`date +%s`
	   last_heart_time=`expr $now - $jenkins_last_heart`
	   echo "last_heart_time:$last_heart_time"
	   if [ $last_heart_time -gt 10 ];then
		   service rsync start
	       echo "rsync is started"
		   ./cluster/cluster stop
	       echo "cluster is stoped"
	   else
		   service rsync stop
	       echo "rsync is stoped"
		   ./cluster/cluster start $@
	       echo "cluster is started"
	   fi
   else
	   service rsync start
	   echo "rsync is started"
	   ./cluster/cluster stop
	   echo "cluster is stoped"
   fi

   sleep 2

done

