#!/bin/bash

hash inotifywait
[[ $? != 0 ]] && exit 2

hash rsync
[[ $? != 0 ]] && exit 2

exit 0
