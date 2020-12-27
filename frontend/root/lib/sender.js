let DatabaseController = ""
let Cookies = new Cookies();

function init(){
	if (!checkCookie()){
		$("#myForm").css("display","block");
	}
	else{
		let Url = Cookies.getCookie("database_address");
		let Bucket = Cookies.getCookie("bucket");
		let Token = Cookies.getCookie("token");
		DatabaseController = new DatabaseController(Url,Bucket,Token)
		//setInterval(sendInCyckle,300);
	}
	Measurement_prefix = measurement_prefix;
}


function sendInCyckle(){
	let timestamp = new Date();
	let tags = {}
	tags['seconds'] = timestamp.getSeconds();
	tags['minutes'] = timestamp.getMinutes();
	DatabaseController.prepareQuery("time",timestamp.getSeconds(),tags);

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

function formFunction(){
	let Url = $("#addr").val();
	let Bucket = $("#bucket").val();
	let Token = $("#psw").val();
	Cookies.setCookie("database_address",Url);
	Cookies.setCookie("token",Token)
	Cookies.setCookie("bucket",Bucket);
	$("#myForm").hide();
	DatabaseController = new DatabaseController(Url,Bucket,Token);
}

