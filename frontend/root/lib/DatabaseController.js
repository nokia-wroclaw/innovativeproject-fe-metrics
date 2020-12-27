
class DatabaseController{

    constructor(Url,Bucket,Token="",intervalTime=4000,measurement_prefix="fem") {
        this.Url = Url;
        this.Bucket = Bucket;
        this.Token = Token;
        this.Measurement_prefix = measurement_prefix;
        this.query = "";
        this.DatabaseExist = false;
        setInterval(sendQueries,intervalTime)
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

    dropDatabase(addr){
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
