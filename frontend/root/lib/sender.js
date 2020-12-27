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
		//setInterval(sendInCycle,300);
	}

	document.getElementById("basicSendOne").addEventListener("click",function (){
		DatabaseController.prepareQuery('metric' ,4200,
			{'tag1':'test', 'tag2':3000, 'tag3':4000})
	})

	document.getElementById("basicSendTwo").addEventListener("click",function (){
		DatabaseController.prepareQuery('NewMetric' ,5000)
	})

	document.getElementById("basicSendThree").addEventListener("click",function (){
		DatabaseController.prepareQuery('newMetric' ,3000)
	})

	document.getElementById("dropDb").addEventListener("click",function (){
		DatabaseController.dropDatabase();
	})

	document.getElementById("basicError").addEventListener("click",function (){
		DatabaseController.throwBasicError("example error")
	})

	document.getElementById("longCount").addEventListener("click",function (){
		DatabaseController.catchOwnFunctionPerformance(longCount,"longStart","longEnd")
	})

	document.getElementById("shortCount").addEventListener("click",function (){
		DatabaseController.catchOwnFunctionPerformance(shortCount,"shortStart","shortEnd")
	})

	DatabaseController.catchEvents(document.getElementById("image"),["hover","click"])
	DatabaseController.catchErrors();
	DatabaseController.catchPerformanceMeasurements();
}




function sendInCycle(){
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
	//setInterval(sendInCycle,300);
}

