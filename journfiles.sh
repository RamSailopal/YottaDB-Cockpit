#!/bin/bash
source /root/.local/share/cockpit/yottafree1/envfile
source $yotta_inst/ydb_env_set
find "$ydb_dir/$ydb_rel/g" -name "yottadb.mjl*" -exec ls -l '{}' \; | awk '{ print $9"@"$5"@"$6" "$7" "$8 }'
