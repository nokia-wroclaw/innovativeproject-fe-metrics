import { catchingEventsLogs } from "./Events";
import { catchingErrors } from "./Errors";
import { getPerformance } from "./Performance";
import { checkHowLong } from "./Performance";

export var Url = "";
export var Bucket ="";
export var Token = "";
export var Measurement_prefix = "fem"
export var query = "";
export var DatabaseExist = false;

export function setUrl(url){
    Url = url;
}

export function setBucket(bucket){
    Bucket = bucket;
}
export function setToken(token){
    Token = token;
}
export function setPrefix(prefix){
    Measurement_prefix = prefix;
}
export function setQuery(newQuery){
    query = newQuery;
}
export function setExist(exist){
    DatabaseExist =exist
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

export function dropDatabase(){
        DatabaseExist = false;
        fetch(Url+"/query?db="+Bucket+"&q=DROP DATABASE "+Bucket,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

export function sendQueries(){
        if (query !== "" && Url !== "" && Bucket !== "" && DatabaseExist){
            if (Token !== ""){
                fetch(Url,{
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

export function checkDb(db_name){
        if (!Url.includes("localhost:8086")){
            DatabaseExist = true;
        }else{
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

    }

export function catchPerformanceMeasurements(){
    const performanceMeasurements = getPerformance();
    for (let measurement of performanceMeasurements){
        prepareQuery(measurement[0],measurement[1],measurement[2])
    }
}

export function catchErrors(ev){
    const errorMeasurement = catchingErrors(ev);
    prepareQuery(errorMeasurement[0],errorMeasurement[1],errorMeasurement[2]);
    console.log(ev)
    }

export function catchEvents(elem,eventList){
        for(let event of eventList){
            elem.addEventListener(event, function (ev){
                const eventMeasurement = catchingEventsLogs(ev);
                prepareQuery(eventMeasurement[0],eventMeasurement[1],eventMeasurement[2]);
            })
        }
    }
export function catchOwnFunctionPerformance(func,startName,endName){
        const score = checkHowLong(func,startName,endName)
        prepareQuery(score[0],score[1],score[2]);
    }

export function throwBasicError(mess){
        throwBasicError(mess);
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


