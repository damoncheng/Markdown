#!/bin/bash

LOG_DIR=$1
ip=$2
dest=$3
COUNT=$4

#echo "$LOG_DIR"
#echo "$ip"
#echo "$COUNT"

if ! [[ $LOG_DIR =~ ^/.* ]];then
      exit 2
elif  [[ $ip =~ ^[[:space:]]*$ ]];then
      exit 2
elif  [[ $dest =~ ^[[:space:]]*$ ]];then
      exit 2
elif [[ $COUNT =~ ^[[:space:]]*$ ]];then
      exit 2
fi

echo "ls -lc -rt $LOG_DIR | grep $ip | grep "_${dest}\$" | tail -n$COUNT | awk '{print \$8}' | grep -v '^\s*$' | sed ':a;N;s/\n/|/;t a'"
exclude_files=`ls -lc -rt $LOG_DIR | grep $ip | grep "_${dest}\$" | tail -n$COUNT | awk '{print $8}' | grep -v "^\s*$" | sed ':a;N;s/\n/|/;t a'`
echo "exclude_files:$exclude_files"
files=`ls $LOG_DIR | grep "$ip" | grep "_${dest}\$" | grep -v -P $exclude_files`

for one_file in $files
do
    rm $LOG_DIR/$one_file
done

exit 0
