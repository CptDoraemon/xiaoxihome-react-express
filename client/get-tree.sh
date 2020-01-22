#!/bin/bash
# Get directory and file tree in /src

FILE='README.txt'

find ./src -not -path '*/\.*' | sort -n > $FILE

sed -i '' -e '
s;[^/]*/; /;g;
s;/ ;    ;g;
s;^ /$;.;
s; /;├── ;g
' $FILE