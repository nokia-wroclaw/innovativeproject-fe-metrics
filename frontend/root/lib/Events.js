import Measurement from "./Measurement";
export default class Events{

    constructor() {
    }

    catchingEventsLogs(event,measurementName="log"){
        let tags = {};
        for (let property in event) {
            let tagValue = "";
            if (typeof event[property] ==="string"){
                tagValue = '"'+event[property]+'"';
                tagValue.replaceAll(" ", "_");
            }
            else if (typeof event[property] === "number" || typeof event[property] ==="boolean"){
                tagValue= event[property]
            }
            if (tagValue !== ""){
                tags[property] = tagValue;
            }
        }
            return new Measurement(measurementName, '"'+event.type+'"', tags)
    }
}