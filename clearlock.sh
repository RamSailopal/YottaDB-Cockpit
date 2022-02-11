#!/bin/bash
source /usr/share/cockpit/yottadb/envfile
source $yotta_inst/ydb_env_set
/usr/local/yottadb/lke << EOF  > /dev/null 
clear pid=$1
Y
exit
EOF
