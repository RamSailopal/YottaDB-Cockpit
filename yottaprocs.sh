#!/bin/bash
while read proc
do
   xargs top -b -n 1 -p <<< "$proc" | awk 'END { print $1"#"$2"#"$3"#"$4"#"$5"#"$6"#"$7"#"$8"#"$9"#"$10"#"$11 }'
done <<< "$(ps -ef | grep yottadb | grep -v "grep" | awk '{ print $2 }')"
