#!/bin/bash
ss -lnp | awk '/yottadb/ { split($5,arr,":");printf "%s:",arr[4],split($7,arr,",");split(arr[2],arr1,"=");printf "%s",arr1[2];proc=arr1[2] } END { while("cat /proc/"proc"/net/netstat" | getline var) { } split(var,net," ");printf ":%s:%s",net[4],net[5];close("cat /proc/"proc"/net/netstat") }'
