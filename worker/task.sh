#!/bin/bash


# Environments
env | grep replicate_max_count
if [ "$replicate_max_count" = "" ]; then
    replicate_max_count=5
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
REPLICATE_DIR=$DIR"/db_replicate"


# create replicate
fileName=$(date +'%Y-%m-%d_%H:%M:%S')"-redmine.sql"
echo "New backup : "$REPLICATE_DIR"/"$fileName
MYSQL_PWD=root mysqldump -h redmine-mariadb -u root redmine > $REPLICATE_DIR"/"$fileName


# check replicate count
while [ $(ls -l $REPLICATE_DIR | grep sql | wc -l) -gt $replicate_max_count ]
do
    WANT_DELETE_FILE=$( ls -lrt $REPLICATE_DIR | grep sql | head -1 | awk '{print $9}' )
    echo "Del backup : "$REPLICATE_DIR"/"$WANT_DELETE_FILE
    # delete older file
    rm $REPLICATE_DIR"/"$WANT_DELETE_FILE
done