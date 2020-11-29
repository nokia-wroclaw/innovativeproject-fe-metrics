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

function init(db_addr, db_name , username="",password="", measurement_prefix="fem"){
	Username = username;
	Password = password;
	Database_address = db_addr;
	Database_name = db_name;
	Measurement_prefix = measurement_prefix;
	if (!checkDb(db_name)) {
		createDb(db_name);
	}
}


function catchingEventsLogs(elem="body",eventsList = events){
	$(elem).on(eventsList.join(" "),function(ev){
		let tags = {};

		for (let property in ev) {
			let tagValue = "";
			if (typeof ev[property] ==="string"){
				tagValue = '"'+ev[property]+'"';
				tagValue.replaceAll(" ", "_");
			}
			else if (typeof ev[property] === "number" || typeof ev[property] ==="boolean"){
				tagValue= ev[property]
			}
			if (tagValue === ""){
				continue;
			}
			else {
				tags[property] = tagValue;
			}
		}
		basicSend('log','"'+ev.type+'"',tags);
	});
}

function autoCatchErrors(measurementName='error'){
	window.addEventListener('error', function(ev){
		ev.preventDefault();
		ev.stopImmediatePropagation();
		console.log(ev.message);
		let tags = {};
		for (let property in ev){
			if (typeof ev[property] === "object"){
				tags[property] = '"'+ ev[property].constructor.name + '"';
			}
			else if (typeof ev[property] === "string") {
				let string = '"'+ev[property]+'"';
				if(string.includes("[native")){
					continue;
				}
				else {
					let validString = string.replaceAll(" ", "_");
					tags[property] = validString;
				}
			}
			else if (typeof ev[property] === "number" || typeof ev[property] ==="boolean") {
				tags[property] = ev[property];
			}
		}
		basicSend(measurementName,'"'+ev.message+'"',tags);
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
	let databasesNames = jsonIssues.results[0].series[0].values;
	let isDatabaseExists = false
	for(let i =0; i < databasesNames.length ; i++){
		if (databasesNames[i][0] === db_name){
			isDatabaseExists = true;
		};
	}
	return isDatabaseExists;

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

function dropDatabase(addr){
	sendRequest("POST",addr+"/query?db="+Database_name+"&q=DROP DATABASE "+Database_name);
}

function getPerformance(){
	let entries = performance.getEntries();
	for(let i = 0; i < entries.length - 1; i++){
		let entry = entries[i].toJSON();
		sendJson(entry);
	}

}

function sendJson(entry){
	let tags = {};
	let value = entry.duration;
	for (let property in entry){
		if (typeof entry[property] === "object"){
			tags[property] = '"'+ entry[property].constructor.name + '"';
		}
		else if (typeof entry[property] === "string") {
			let string = '"'+entry[property]+'"';
			let validString = string.replaceAll(" ", "_");
			tags[property] = validString;
		}
		else if (typeof entry[property] === "number" || typeof entry[property] ==="boolean") {
			tags[property] = entry[property];
		}
	}
	basicSend("performance", value, tags);
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


function longCount(x){
	let random = randomInt(100000000,1000000000);
	for (let i = 0; i <random ; i++) {
		let x = i;
	}
	alert(x);
}

function checkHowLong(func){
	performance.mark("p1");
	func();
	performance.mark("p2");
	performance.measure("measure p1 to p2", "p1", "p2");
	sendJson(performance.getEntriesByName("measure p1 to p2")[0].toJSON());
	performance.clearMarks();
	performance.clearMeasures();

}


//NOT WORK YET
//function sendInInterval(interval, measurement_name, value){
//	let localTimer = setInterval(sendInInterval,interval * 1000,interval, measurement_name, value);
//	basicSend(measurement_name, value);
//}


