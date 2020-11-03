//Really basic version of sender ready to develop
//TO RESET NGINX:
//docker-compose up -d --build
//docker exec -it innovativeproject-fe-metrics_web_1 nginx -s reload to reload nginx

const xhr = new XMLHttpRequest();

function send(value, interval){
    //Sending random value for testing purposes
    //let str = 'metric value=' + value

    function xhrSend(){
        let str = 'metric value=' + Math.random();
        xhr.open("POST", "http://localhost:8086/write?db=metrics");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
    };

    var sendIntervalID = setInterval(xhrSend, interval * 1000);
};


send(1, 5); //sends value 1 every 5 seconds