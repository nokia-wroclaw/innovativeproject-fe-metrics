//Really basic version of sender ready to develop

const xhr = new XMLHttpRequest();

function send(id, metric, interval, hostname){
    let str = 'database,hostname=' + hostname + ' numMeasurements=' + id + 'i,numSeries=' + metric + 'i'

    function xhrSend(){
        xhr.open("POST", "http://localhost:8086/write?db=_internal");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
    };

    var sendIntervalID = setInterval(xhrSend, interval * 1000);
};

send(10, 1, 5, "trolololo"); //sends metric 1 every 5 seconds for element 42
