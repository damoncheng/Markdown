#!/bin/bash

IFS=$'\n'
exclude=" "
exclude_file=$1
exclude_content=`cat $exclude_file`

for one_exclude in $exclude_content
do

    eval `echo $one_exclude | awk '{printf("path=%s",$1)}'`
    if [[ $path =~ ^/.* ]];then
        exclude="$exclude --exclude=$path "
    fi

done

echo -n $exclude


