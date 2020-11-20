//Really basic version of sender ready to develop
//RELOAD NGINX:
//docker-compose up -d --build
//docker exec -it main-directory-name_web_1 nginx -s reload

const xhr = new XMLHttpRequest();


function sendRequest(type,url) {
	xhr.open(type, url,false)
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
}


function init(db_addr, db_name , username="",password="", measurement_prefix="fem"){
	let Database_address = db_addr;
	let Database_name = db_name;
	let Measurement_prefix = measurement_prefix;
	if (!checkDb(db_name)) {
		createDb(db_name);
		console.log("there");
	}
}

function checkDb(db_name){

	var jsonIssues = {};
	$.ajax({
		url: "http://localhost:8086/query?q=show%20databases",
		async: false,
		dataType: 'json',
		success: function(data) {
			jsonIssues = data;
		}
	});
	let x = jsonIssues.results[0].series[0].values;
	let flag = false
	for(let i =0; i < x.length ; i++){
		if (x[i][0] === db_name){
			flag = true;
		};
	}
	return flag;

}


function createDb(db_name){
	let q1 = 'CREATE DATABASE ' + db_name;
	let q2 = 'CREATE RETENTION POLICY "inf" ON '+db_name +' DURATION INF REPLICATION 1';
	let q3 = 'ALTER RETENTION POLICY "inf" ON '+db_name +' DEFAULT';
	let addr = 'http://localhost:8086/query?q=';
	sendRequest('POST',addr+q1);
	sendRequest('POST',addr+q2);
	sendRequest('POST',addr+q3);

}

function basicSend(measurement_name, value, tags={}){
	let str = '' + Measurement_prefix+ '_' + measurement_name;
	for (const [key, key_value] of Object.entries(tags)){
		str = str + ','+key+'='+key_value;
	}
	str = str + ' value=' + value;
	xhr.open("POST", Database_address);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(str);
}


function sendInInterval(interval, measurement_name, value){
	let localTimer = setInterval(sendInInterval,interval * 1000,interval, measurement_name, value);
	basicSend(measurement_name, value);
}


export {sendInInterval, basicSend, createDb, checkDb, init}
//send(1, 5); //sends value 1 every 5 seconds