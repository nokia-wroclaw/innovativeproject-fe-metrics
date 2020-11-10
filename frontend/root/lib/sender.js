//Really basic version of sender ready to develop
//RELOAD NGINX:
//docker-compose up -d --build
//docker exec -it main-directory-name_web_1 nginx -s reload

const xhr = new XMLHttpRequest();
var Username;
var Password;
var Database_address;
var Measurement_prefix;
var Database_name;

var getJSON = function(url, callback) {

    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    
    xhr.send();
};


function init(db_addr, db_name , username="",password="", measurement_prefix="fem"){
	Username = username;
	Password = password;
	Database_address = db_addr;
	Database_name = db_name;
	Measurement_prefix = measurement_prefix;
}

function checkDb(){

	getJSON('http://localhost:8086/query?q=show%20databases',  function(err, data) {
		let x = data.results[0].series[0].values;
   		for(let i =0; i < x.length ; i++){
			console.log(x[i][0]);	
		}
});


}

function createDb(db_name){
	let q1 = 'CREATE DATABASE ' + db_name;
	let q2 = 'CREATE RETENTION POLICY "inf" ON '+db_name +' DURATION INF REPLICATION 1';
	let q3 = 'ALTER RETENTION POLICY "inf" ON '+db_name +' DEFAULT';
	let q4 = 'CONTEXT-DATABASE: ' +db_name;
	let q5 = 'CONTEXT-RETENTION-POLICY: "inf"';
	let fullQ = q1+';'+q2+';'+q3+';'+q4+';'+q5;

	console.log('http://localhost:8086/query?q='+fullQ);
	xhr.open("POST", 'http://localhost:8086/query?q='+fullQ)
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();

}


function basicSend(measurement_name, value, tags={}){
	let str = '' + Measurement_prefix+ '_' + measurement_name;
	for (const [key, key_value] of Object.entries(tags)){
		str = str + ','+key+'='+key_value;
	}


	str = str + ' value=' + value;
	console.log(str);
    xhr.open("POST", Database_address);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}


function sendInInterval(interval, measurement_name, value){
    let localTimer = setInterval(sendInInterval,interval * 1000,interval, measurement_name, value);
    basicSend(measurement_name, value);
}


//send(1, 5); //sends value 1 every 5 seconds
