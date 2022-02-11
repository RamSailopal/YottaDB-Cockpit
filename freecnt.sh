#!/bin/bash
source /usr/share/cockpit/yottadb/envfile
source $yotta_inst/ydb_env_set
ydb <<< 'D ^%FREECNT' | awk '/^---/ { mrk=1;next } mrk==1 { sub(")","",$5);print $1":"$2":"$3":"$5":"$6;mrk=0 }'
