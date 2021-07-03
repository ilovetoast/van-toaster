#!/bin/bash
echo "{";
wpa_cli status | while read line ; do
    if [[ $line =~ "=" ]]
    then
      IFS='='
      read -a strarr <<< "$line"
      echo " \""${strarr[0]}"\": \""${strarr[1]}"\" ,"
    fi
done
echo " \"end\": \"true\"}";
