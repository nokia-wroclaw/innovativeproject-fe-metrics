const xhr = new XMLHttpRequest();
var Username;
var Password;
var Database_address;
var Measurement_prefix;
var Database_name;
const events = ("mousedown mouseup focus keydown" +
	" change mouseup dblclick mousemove mouseover mouseout mousewheel" +
	" keydown keyup keypress textInput touchstart touchmove touchend touchcancel resize scroll" +//
	" zoom focus blur select change submit reset").split(" ");
const oneEvent = "keydown submit mousemove".split(" ");

function init(db_addr, db_name , username="",password="", measurement_prefix="fem"){
	Username = username;
	Password = password;
	Database_address = db_addr;
	Database_name = db_name;
	Measurement_prefix = measurement_prefix;
	if (!checkDb(db_name)) {
		createDb(db_name);
		console.log("there");
	}
}


function catchingEventsLogs(elem="body",eventsList = events){
	$(elem).on(eventsList.join(" "),function(ev){
		let tags1 = {};
		for (let property in ev) {
			let string = "";
			if (typeof ev[property] ==="string"){
				string = '"'+ev[property]+'"';
				string.replaceAll(" ", "_");
			}
			else if (typeof ev[property] === "number"){
				string = ev[property]
			}
			else if (typeof ev[property] === "boolean"){
				string = ev[property];
			}
			if (string === ""){
				continue;
			}
			else {
				tags1[property] = string;
			}
		}
		basicSend('log','"'+ev.type+'"',tags1);
	});
}

function autoCatchErrors(measurementName='error'){
	window.addEventListener('error', function(ev){
		ev.preventDefault();
		ev.stopImmediatePropagation();
		let tags1 = {};
		for (let propt in ev){;
			if (typeof ev[propt] === "object"){
				tags1[propt] = '"'+ ev[propt].constructor.name + '"';
			}
			else {

				let string = '"'+ev[propt]+'"';
				if(string.includes("[native")){
					continue;
				}
				else {
					let validString = string.replaceAll(" ", "_");
					tags1[propt] = validString;

				}
			}
		}
		basicSend(measurementName,'"'+ev.message+'"',tags1);

	});
}

function throwBasicError(mess){
	throw new Error(mess);
}


function sendRequest(type,url){
	xhr.open(type, url,false)
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send();
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
	let q4 = 'CONTEXT-DATABASE: ' +db_name;
	let q5 = 'CONTEXT-RETENTION-POLICY: "inf"';
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


//send(1, 5); //sends value 1 every 5 seconds
