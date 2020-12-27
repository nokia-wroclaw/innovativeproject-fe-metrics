


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


function formFunction(){
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

