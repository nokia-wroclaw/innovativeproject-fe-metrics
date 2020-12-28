export function getPerformance(){
        let entries = performance.getEntries();
        const performanceMeasurements = []
        for(let i = 0; i < entries.length; i++){
            let entry = entries[i].toJSON();
            performanceMeasurements.push(preparePerformanceMeasurement(entry));
        }
        return performanceMeasurements
    }

export function checkHowLong(func,startName,endName){
        performance.mark(startName);
        func();
        performance.mark(endName);
        performance.measure("measure "+startName+" to "+endName, startName, endName);
        const performanceMes  = preparePerformanceMeasurement(performance.getEntriesByName("measure "+startName+" to "+endName)[0].toJSON());
        performance.clearMarks();
        performance.clearMeasures();
        return performanceMes;

    }
export function preparePerformanceMeasurement(entry,name="performance"){
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
    return [name,value,tags]
}