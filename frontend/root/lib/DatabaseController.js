var Token;
var Url;
var Bucket;
var query = "";
var DatabaseExist = false;



function init(measurement_prefix="fem"){
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

function checkDb(db_name){
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

function createDb(db_name){
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
    DatabaseExist = false;
    fetch(Url+"/query?db="+Bucket+"&q=DROP DATABASE "+Bucket,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


function sendQueries(){
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