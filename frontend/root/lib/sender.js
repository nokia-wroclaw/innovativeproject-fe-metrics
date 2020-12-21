var Username;
var Password;
var Database_address;
var Measurement_prefix;
var Database_name;
const eventsForAdvertisement = ("hover click").split(" ");
var query = "";

function init(measurement_prefix="fem"){
	if (!checkCookie()){
		$("#myForm").css("display","block");
	}
	else{
		Database_address = getCookie("database_address");
		Database_name = getCookie("bucket");
		Password = getCookie("token");
		if (!checkDb(Database_name)) {
			createDb(Database_name);
		}
		setInterval(sendQueries,4000);
		//setInterval(sendInCyckle,300);
	}
	Measurement_prefix = measurement_prefix;
}


function catchingEventsLogs(elem="#image",eventsList = eventsForAdvertisement){
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
				if (tagValue !== ""){
					tags[property] = tagValue;
				}
			}
		prepareQuery('log','"'+ev.type+'"',tags);
	});
}

function catchingErrors(measurementName='error'){
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
					if(!string.includes("[native")){
						tags[property] = string.replaceAll(" ", "_");
					}
				}
				else if (typeof ev[property] === "number" || typeof ev[property] ==="boolean") {
					tags[property] = ev[property];
				}
			}
		prepareQuery(measurementName,'"'+ev.message+'"',tags);
	});
}

function throwBasicError(mess){
	throw new Error(mess);
}



function checkDb(db_name){
    if (!Database_address.includes("localhost:8086")){
        return true
    }
    let jsonIssues = {};
	$.ajax({
		url: "http://localhost:8086/query?q=show%20databases",
		async: false,
		dataType: 'json',
		success: function(data) {
			jsonIssues = data;
			let isDatabaseExists = false
			let databasesNames = jsonIssues.results[0].series[0].values;
			for(let i =0; i < databasesNames.length ; i++){
				if (databasesNames[i][0] === db_name){
					isDatabaseExists = true;
				}
			}
			return isDatabaseExists;
		},
		fail: function (data){
			return  false
		}
	});
}


function createDb(db_name){
	let q1 = 'CREATE DATABASE ' + db_name + ";";
	let addr = 'http://localhost:8086/query?q=';
	fetch(addr+q1,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

function prepareQuery(measurement_name, value, tags={}){
	let str = '' + Measurement_prefix+ '_' + measurement_name;
	for (const [key, key_value] of Object.entries(tags)){
		str = str + ','+key+'='+key_value;
	}
	str = str + ' value=' + value;
	str = str+" "+ (Date.now()*1000000) +"\n";
	query = query +str;
}

function dropDatabase(addr){
	fetch(addr+"/query?db="+Database_name+"&q=DROP DATABASE "+Database_name,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

function getPerformance(){
	let entries = performance.getEntries();
	for(let i = 0; i < entries.length - 1; i++){
		let entry = entries[i].toJSON();
		sendJson(entry);
	}

}

function sendInCyckle(){
	let timestamp = new Date();
	let tags = {}
	tags['seconds'] = timestamp.getSeconds();
	tags['minutes'] = timestamp.getMinutes();
	prepareQuery("time",timestamp.getSeconds(),tags);

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
				tags[property] = string.replaceAll(" ", "_");
			}
			else if (typeof entry[property] === "number" || typeof entry[property] ==="boolean") {
				tags[property] = entry[property];
			}
	}
	prepareQuery("performance", value, tags);
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


function longCount(){
	let random = randomInt(100000000,1000000000);
	for (let i = 0; i <random ; i++) {
		let x = i;
	}
}


function shortCount(){
	let random = randomInt(1000000,10000000);
	for (let i = 0; i <random ; i++) {
		let x = i;
	}
}

function checkHowLong(func,startName,endName){
	performance.mark(startName);
	func();
	performance.mark(endName);
	performance.measure("measure "+startName+" to "+endName, startName, endName);
	sendJson(performance.getEntriesByName("measure "+startName+" to "+endName)[0].toJSON());
	performance.clearMarks();
	performance.clearMeasures();

}

function sendQueries(){
	if (query !== "" && Database_address !== "" && Database_name){
		if (Password !== ""){
			fetch(Database_address,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Token '+Password
				},
				body: query
			})
		} else{
			fetch(Database_address,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: query
			})
		}
		query = "";
	}
}

function formFunction(){
	Database_address = $("#addr").val();
	Database_name = $("#bucket").val();
	Password = $("#psw").val();
	setCookie("database_address",Database_address);
	setCookie("token",Password)
	setCookie("bucket",Database_name);
	$("#myForm").hide();
	if (!checkDb(Database_name)) {
		createDb(Database_name);
	}
    setInterval(sendQueries,4000);
    //setInterval(sendInCyckle,300);
}

function setCookie(cname, cvalue) {
	//var d = new Date();
	//d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	//var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue //+ ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	let addr = getCookie("database_address");
	let bucket = getCookie("bucket")
	return !((addr === "") || (bucket === ""));
}