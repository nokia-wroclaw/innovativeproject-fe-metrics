#!/bin/bash

cd ../var/lib/influxdb/
influx -import -path=db_init.txt -precision=s
exit
