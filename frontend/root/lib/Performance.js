class Performance{

    constructor() {
    }

    getPerformance(){
        let entries = performance.getEntries();
        const performanceMeasurements = []
        for(let i = 0; i < entries.length - 1; i++){
            let entry = entries[i].toJSON();
            performanceMeasurements.push(preparePerformanceMeasurement(entry));
        }
        return performanceMeasurements
    }
}

function preparePerformanceMeasurement(entry,name="performance"){
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
    return new Measurement("performance",value,tags)
}