# innovativeproject-fe-metrics
_Metrics from frontend into TSDB_

## Table of contents
* [Prerequisites](#prerequisites)
* [First use](#first-use)
* [Helpfull commends](#helpfull-commends)
* [Links](#links)
* [Documentation](#documentation)


## How to run locally
### Prerequisites
- docker
- linux shell

### Starting

#### first use

to init apk for first time you use:

`docker-compose up -d --build`  
`docker exec -it <folder_name>_influx-grafana_1 bash /var/lib/influxdb/scripts/init.sh` (you can check name using tab)  

to start running apk you use:

`docker-compose up -d`

to stop running apk you use:

`docker-compose down`

#### helpfull commends
 
you can use it after `docker-compose up -d --build`  

- `docker exec -it <folder_name>_influx-grafana_1 bash /var/lib/influxdb/scripts/show-db.sh` (show db list)

- `docker exec -it <folder_name>_influx-grafana_1 bash /var/lib/influxdb/scripts/drop-metrics-db.sh` (drop local metrics db)

### links:

- http://localhost:8080/ - app demo page

- http://localhost:3003/ - grafana

- http://localhost:3004/ - influx

## Documentation 

### figma visualisation of page
- https://www.figma.com/file/BAXcGuuqzTz3avPUxSZHqd/Untitled?node-id=4%3A8

### api
- https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/blob/main/doc/api.pdf
- https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/blob/main/doc/api.txt

### architecture sketch
- https://github.com/nokia-wroclaw/innovativeproject-fe-metrics/blob/main/doc/ARCHITECTURE.pdf
<<<<<<< HEAD

=======
>>>>>>> origin/dev



