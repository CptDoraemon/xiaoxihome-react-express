#!/bin/bash
# Get directory and file tree in /src

FILE='README.md'

find ./src -not -path '*/\.*' > $FILE

sed -i '' -e '
s;[^/]*/; /;g;
s;/ ;    ;g;
s;^ /$;.;
s; /;├── ;g
' $FILE