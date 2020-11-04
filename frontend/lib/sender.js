//Really basic version of sender ready to develop
//RELOAD NGINX:
//docker-compose up -d --build
//docker exec -it innovativeproject-fe-metrics_web_1 nginx -s reload

const xhr = new XMLHttpRequest();
var Username;
var Password;
var Database_address;
var timer = 0;

function init(db, username="",password=""){
	Username = username;
	Password = password;
	Database_address = db;
}

function basicSend(value){
    let str = 'metric value=' + value;
    xhr.open("POST", Database_address);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(str);
}

function sendXTimes(counter, interval, value){
    let localTimer = setInterval(sendXTimes,interval * 1000,counter-1,interval, value);
    if (counter >0){
        basicSend(value);
    }
    else {
        clearInterval(localTimer);
    }
}

function sendInInterval(interval, value){
    let localTimer = setInterval(sendXTimes,interval * 1000,counter-1,interval, value);
    basicSend(value);
}


//send(1, 5); //sends value 1 every 5 seconds
