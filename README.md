# innovativeproject-fe-metrics
_Metrics from frontend into TSDB_

## How to run locally
### Prerequisites
- docker
- linux shell

### Starting

#### first use

to init apk for first time you use:

`docker-compose up -d --build`  
`docker exec -it <folder_name>-influx-grafana_1 bash` (you can check name using tab)  
`cd ../var/lib/influxdb`  
`influx -import -path=db_init.txt -precision=s
exit`


to start running apk you use:

`docker-compose up -d`

to stop running apk you use:

`docker-compose down`

### links:

- http://localhost:8080/ - app demo page

- http://localhost:3003/ - grafana

- http://localhost:3004/ - influx

