//Really basic version of sender ready to develop

const xhr = new XMLHttpRequest();

function send(metric, interval, hostname){
    let str = 'database,hostname=' + hostname + ' numMeasurements=' + metric + 'i,numSeries=' + metric + 'i'

    xhr.open("POST", "http://localhost:8086/write?db=_internal");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(str);
}

send(1, 0, "sender");