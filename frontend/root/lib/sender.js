//Really basic version of sender ready to develop
//RELOAD NGINX:
//docker-compose up -d --build
//docker exec -it main-directory-name_web_1 nginx -s reload

const xhr = new XMLHttpRequest();
var Username;
var Password;
var Database_address;
var Measurement_prefix;

function init(db, username="",password="", measurement_prefix="fem"){
	Username = username;
	Password = password;
	Database_address = db;
	Measurement_prefix = measurement_prefix;
}

function basicSend(measurement_name, value){
    let str = '' + Measurement_prefix+ '_' + measurement_name + ' value=' + value;
    xhr.open("POST", Database_address);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(str);
}


function sendInInterval(interval, measurement_name, value){
    let localTimer = setInterval(sendInInterval,interval * 1000,interval, measurement_name, value);
    basicSend(measurement_name, value);
}


//send(1, 5); //sends value 1 every 5 seconds
