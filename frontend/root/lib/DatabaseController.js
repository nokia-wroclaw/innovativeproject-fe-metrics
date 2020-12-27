import Errors from "./Errors";
import Events from "./Events";
import Performance from "./Performance";
export default class DatabaseController{

    constructor(Url,Bucket,Token="",intervalTime=4000,measurement_prefix="fem") {
        this.Url = Url;
        this.Bucket = Bucket;
        this.Token = Token;
        this.Measurement_prefix = measurement_prefix;
        this.query = "";
        this.DatabaseExist = false;
        this.checkDb(Bucket)
        setInterval(this.sendQueries,intervalTime)
    }

    prepareQuery(measurement_name, value, tags={}){
        let str = '' + this.Measurement_prefix+ '_' + measurement_name;
        for (const [key, key_value] of Object.entries(tags)){
            str = str + ','+key+'='+key_value;
        }
        str = str + ' value=' + value;
        str = str+" "+ (Date.now()*1000000) +"\n";
        this.query = this.query +str;
    }

    dropDatabase(){
        this.DatabaseExist = false;
        fetch(Url+"/query?db="+Bucket+"&q=DROP DATABASE "+Bucket,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }

    sendQueries(){
        if (this.query !== "" && this.Url !== "" && this.Bucket !== "" && this.DatabaseExist){
            if (this.Token !== ""){
                fetch(this.Url + "/api/v2/write?bucket=metrics",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Token '+this.Token
                    },
                    body: this.query
                })
            } else{
                fetch(this.Url + "/api/v2/write?bucket=metrics",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: this.query
                })
            }
            this.query = "";
        }
    }

    createDb(db_name){
        let q1 = 'CREATE DATABASE ' + db_name + ";";
        let addr = this.Url + '/query?q='+q1;
        fetch(addr,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (){
            this.DatabaseExist = true;
        })

    }

    checkDb(db_name){
        if (!this.Url.includes("localhost:8086")){
            this.DatabaseExist = true;
        }
        let jsonIssues = {};
        $.ajax({
            url: this.Url+"/query?q=show%20databases",
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
                    this.createDb(db_name)
                }
                else {
                    this.DatabaseExist = true
                }
            },
            fail: function (data){
                this.createDb(db_name)
            }
        });
    }

    catchPerformanceMeasurements(){
        const performance = new Performance();
        const performanceMeasurements = performance.getPerformance();
        for (let measurement in performanceMeasurements){
            this.prepareQuery(measurement.name,measurement.value,measurement.tags)
        }
    }

    catchErrors(){
        window.addEventListener('error',function (ev){
            const errors = new Errors();
            const errorMeasurement = errors.catchingErrors(ev);
            this.prepareQuery(errorMeasurement.name,errorMeasurement.value,errorMeasurement.tags);
        })
    }

    catchEvents(elem,eventList){
        for(let event in eventList){
            elem.addEventListener(event,function (ev){
                const events = new Events();
                const eventMeasurement = events.catchingEventsLogs(ev);
                this.prepareQuery(eventMeasurement.name,eventMeasurement.value,eventMeasurement.tags);
            })
        }
    }
    catchOwnFunctionPerformance(func,startName,endName){
        new Performance().checkHowLong(func,startName,endName)
    }

    throwBasicError(mess){
        new Errors().throwBasicError(mess);
    }

}
