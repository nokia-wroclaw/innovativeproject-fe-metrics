


function sendInCyckle(){
	let timestamp = new Date();
	let tags = {}
	tags['seconds'] = timestamp.getSeconds();
	tags['minutes'] = timestamp.getMinutes();
	prepareQuery("time",timestamp.getSeconds(),tags);

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

