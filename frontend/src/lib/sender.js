var Token;
var Url;
var Measurement_prefix;
var Bucket;
const eventsForAdvertisement = ("hover click").split(" ");
var query = "";
var DatabaseExist = false;



export function init(measurement_prefix="fem"){
	if (!checkCookie()){
		$("#myForm").css("display","block");
	}
	else{
		Url = getCookie("database_address");
		Bucket = getCookie("bucket");
		Token = getCookie("token");
		checkDb(Bucket)
		setInterval(sendQueries,4000);
		//setInterval(sendInCyckle,300);
	}
	Measurement_prefix = measurement_prefix;
}


export function catchingEventsLogs(elem="#image",eventsList = eventsForAdvertisement){
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

export function catchingErrors(measurementName='error'){
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

export function throwBasicError(mess){
	throw new Error(mess);
}



export function checkDb(db_name){
    if (!Url.includes("localhost:8086")){
        DatabaseExist = true;
    }
    let jsonIssues = {};
	$.ajax({
		url: Url+"/query?q=show%20databases",
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
			if (!isDatabaseExists){
				createDb(db_name)
			}
			else {
				DatabaseExist = true
			}
		},
		fail: function (data){
			createDb(db_name)
		}
	});
}


export function createDb(db_name){
	let q1 = 'CREATE DATABASE ' + db_name + ";";
	let addr = Url + '/query?q='+q1;
	fetch(addr,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(function (){
		DatabaseExist = true;
	})

}

export function prepareQuery(measurement_name, value, tags={}){
	let str = '' + Measurement_prefix+ '_' + measurement_name;
	for (const [key, key_value] of Object.entries(tags)){
		str = str + ','+key+'='+key_value;
	}
	str = str + ' value=' + value;
	str = str+" "+ (Date.now()*1000000) +"\n";
	query = query +str;
}

export function dropDatabase(addr){
	DatabaseExist = false;
	fetch(Url+"/query?db="+Bucket+"&q=DROP DATABASE "+Bucket,{
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

export function getPerformance(){
	let entries = performance.getEntries();
	for(let i = 0; i < entries.length - 1; i++){
		let entry = entries[i].toJSON();
		sendJson(entry);
	}

}

export function sendInCyckle(){
	let timestamp = new Date();
	let tags = {}
	tags['seconds'] = timestamp.getSeconds();
	tags['minutes'] = timestamp.getMinutes();
	prepareQuery("time",timestamp.getSeconds(),tags);

}
export function sendJson(entry){
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

export function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}


export function longCount(){
	let random = randomInt(100000000,1000000000);
	for (let i = 0; i <random ; i++) {
		let x = i;
	}
}


export function shortCount(){
	let random = randomInt(1000000,10000000);
	for (let i = 0; i <random ; i++) {
		let x = i;
	}
}

export function checkHowLong(func,startName,endName){
	performance.mark(startName);
	func();
	performance.mark(endName);
	performance.measure("measure "+startName+" to "+endName, startName, endName);
	sendJson(performance.getEntriesByName("measure "+startName+" to "+endName)[0].toJSON());
	performance.clearMarks();
	performance.clearMeasures();

}

export function sendQueries(){
	if (query !== "" && Url !== "" && Bucket !== "" && DatabaseExist){
		if (Token !== ""){
			fetch(Url + "/api/v2/write?bucket=metrics",{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Token '+Token
				},
				body: query
			})
		} else{
			fetch(Url + "/api/v2/write?bucket=metrics",{
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

export function formFunction(){
	Url = $("#addr").val();
	Bucket = $("#bucket").val();
	Token = $("#psw").val();
	setCookie("database_address",Url);
	setCookie("token",Token)
	setCookie("bucket",Bucket);
	$("#myForm").hide();
	if (!checkDb(Bucket)) {
		createDb(Bucket);
	}
    setInterval(sendQueries,4000);
    //setInterval(sendInCyckle,300);
}

export function setCookie(cname, cvalue) {
	//var d = new Date();
	//d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	//var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue //+ ";" + expires + ";path=/";
}

export function getCookie(cname) {
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

export function checkCookie() {
	let addr = getCookie("database_address");
	let bucket = getCookie("bucket")
	return !((addr === "") || (bucket === ""));
}