#!/bin/bash
source /usr/share/cockpit/yottadb/envfile
source $yotta_inst/ydb_env_set
$ydb_dist/lke show -all 2>&1 | awk '/Owned/ { print $1":"$5}'
