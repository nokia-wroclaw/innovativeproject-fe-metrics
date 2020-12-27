let databaseController = ""
let cookies = new Cookies();

function init(){
	if (!cookies.checkCookie()){
		$("#myForm").css("display","block");
	}
	else{
		let Url = cookies.getCookie("database_address");
		let Bucket = cookies.getCookie("bucket");
		let Token = cookies.getCookie("token");
		databaseController = new DatabaseController(Url,Bucket,Token)
		databaseController.catchEvents(document.getElementById("image"),["hover","click"])
		databaseController.catchErrors();
		databaseController.catchPerformanceMeasurements();
		setListeners()
		//setInterval(sendInCycle,300);
	}
}

function setListeners(){

	document.getElementById("basicSendOne").addEventListener("click",function (){
		databaseController.prepareQuery('metric' ,4200,
			{'tag1':'test', 'tag2':3000, 'tag3':4000})
	})

	document.getElementById("basicSendTwo").addEventListener("click",function (){
		databaseController.prepareQuery('NewMetric' ,5000)
	})

	document.getElementById("basicSendThree").addEventListener("click",function (){
		databaseController.prepareQuery('newMetric' ,3000)
	})

	document.getElementById("dropDb").addEventListener("click",function (){
		databaseController.dropDatabase();
	})

	document.getElementById("basicError").addEventListener("click",function (){
		databaseController.throwBasicError("example error")
	})

	document.getElementById("longCount").addEventListener("click",function (){
		databaseController.catchOwnFunctionPerformance(longCount,"longStart","longEnd")
	})

	document.getElementById("shortCount").addEventListener("click",function (){
		databaseController.catchOwnFunctionPerformance(shortCount,"shortStart","shortEnd")
	})
}


function sendInCycle(){
	let timestamp = new Date();
	let tags = {}
	tags['seconds'] = timestamp.getSeconds();
	tags['minutes'] = timestamp.getMinutes();
	databaseController.prepareQuery("time",timestamp.getSeconds(),tags);

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
	let cookies = new Cookies();
	let Url = $("#addr").val();
	let Bucket = $("#bucket").val();
	let Token = $("#psw").val();
	cookies.setCookie("database_address",Url);
	cookies.setCookie("token",Token)
	cookies.setCookie("bucket",Bucket);
	$("#myForm").hide();
	databaseController = new DatabaseController(Url,Bucket,Token)
	databaseController.catchEvents(document.getElementById("image"),["hover","click"])
	databaseController.catchErrors();
	databaseController.catchPerformanceMeasurements();
	setListeners()
	//setInterval(sendInCycle,300);
}

