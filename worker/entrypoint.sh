#!/bin/bash

# set base path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

# environment
env | grep HowManayTimeToBackup
if [ "$HowManayTimeToBackup" = "" ]; then
    HowManayTimeToBackup="0 */4 * * *"
fi

# wait database is running
sleep 60s
# run first backup
bash $DIR/task.sh

# crontab
## generate crontab file
echo "$HowManayTimeToBackup /bin/bash $DIR/task.sh" > $DIR/cron.d/backup
chmod 644 $DIR/cron.d/backup

## add task to crontab
crontab $DIR/cron.d/backup
## start cron
/etc/init.d/cron start

# use tty
/bin/bash
