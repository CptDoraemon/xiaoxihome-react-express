#!/bin/bash

if [ -z "$1" ]
  then
    echo "Need commit message"
    exit 1
fi

if [ ! -z "$2" ]
  then
    echo "Quote commit message"
    exit 1
fi

cd client && npm run get-tree && cd .. & git add . && git commit -m "$1" && git push
