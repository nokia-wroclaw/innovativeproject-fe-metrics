import  * as DatabaseController   from "efemetrics2";


window.addEventListener('DOMContentLoaded', init, false);


function init(){
	document.getElementById("connectBtn").addEventListener("click",function (){
		formFunction();
	})
	setListeners();
	if (!DatabaseController.checkCookie()){
		document.getElementById("connectWithDbBtn").innerText = "Connect with Database";
		console.log("BRAK CIASTEK")
		document.getElementById("connectWithDbBtn").addEventListener("click",function (){
			handleConnectBtn();
		})
	}
	else{
		document.getElementById("connectWithDbBtn").innerText = "Disconnect";
		let Url = DatabaseController.getCookie("database_address");
		let Bucket = DatabaseController.getCookie("bucket");
		let Token = DatabaseController.getCookie("token");
		DatabaseController.setBucket(Bucket);
		DatabaseController.setUrl(Url);
		DatabaseController.setToken(Token)
		DatabaseController.catchEvents(document.getElementById("image"),["click"])
		DatabaseController.catchErrors();
		DatabaseController.catchPerformanceMeasurements();
		DatabaseController.checkDb(Bucket);
		setInterval(DatabaseController.sendQueries,4000);
		document.getElementById("connectWithDbBtn").innerText = "Disconnect";
		document.getElementById("connectWithDbBtn").addEventListener("click",function (){
			handleConnectBtn();
		})
		setInterval(sendInCycle,300);
	}
}

function setListeners(){

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

	//document.getElementById("dropDb").addEventListener("click",function (){
	//	DatabaseController.dropDatabase();
	//})

	document.getElementById("basicError").addEventListener("click",function (){
		DatabaseController.throwBasicError("example error")
	})

	document.getElementById("longCount").addEventListener("click",function (){
		DatabaseController.catchOwnFunctionPerformance(longCount,"longStart","longEnd")
	})

	document.getElementById("shortCount").addEventListener("click",function (){
		DatabaseController.catchOwnFunctionPerformance(shortCount,"shortStart","shortEnd")

	})


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
	DatabaseController.setCookie("database_address",Url);
	DatabaseController.setCookie("token",Token)
	DatabaseController.setCookie("bucket",Bucket);
	let button = document.getElementById("connectWithDbBtn");
	button.innerText = "Disconnect";
	button.style.display = "inline";
	$("#myForm").hide();
	DatabaseController.setBucket(Bucket);
	DatabaseController.setUrl(Url);
	DatabaseController.setToken(Token)
	DatabaseController.catchEvents(document.getElementById("image"),["click"])
	DatabaseController.catchErrors();
	DatabaseController.catchPerformanceMeasurements();
	DatabaseController.checkDb(Bucket);
	setInterval(DatabaseController.sendQueries,4000);
	setInterval(sendInCycle,300);
}
function disconnect() {
	DatabaseController.setCookie("database_address","");
	DatabaseController.setCookie("token","")
	DatabaseController.setCookie("bucket","");
	DatabaseController.setBucket("");
	DatabaseController.setUrl("");
	DatabaseController.setToken("")
	let button = document.getElementById("connectWithDbBtn");
	button.innerText = "Connect with Database"
	document.getElementById("myForm").style.display = "none";
}

function openForm(){
	let button = document.getElementById("connectWithDbBtn").style.display = "None";
	document.getElementById("myForm").style.display = "block";

}

function handleConnectBtn(){
	let button = document.getElementById("connectWithDbBtn");
	if (button.innerText === "Connect with Database"){
		openForm();
	}
	else {
		disconnect();
	}


}
