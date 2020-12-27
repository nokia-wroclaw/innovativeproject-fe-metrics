class Errors{
    constructor() {
    }

    catchingErrors(measurementName='error', errorEvent) {
        errorEvent.preventDefault();
        errorEvent.stopImmediatePropagation();
        console.log(errorEvent.message);
        let tags = {};
        for (let property in errorEvent) {
            if (typeof errorEvent[property] === "object") {
                tags[property] = '"' + ev[property].constructor.name + '"';
            } else if (typeof errorEvent[property] === "string") {
                let string = '"' + errorEvent[property] + '"';
                if (!string.includes("[native")) {
                    tags[property] = string.replaceAll(" ", "_");
                }
            } else if (typeof errorEvent[property] === "number" || typeof errorEvent[property] === "boolean") {
                tags[property] = errorEvent[property];
            }
        }
        return new Measurement(measurementName, '"'+errorEvent.message+'"', tags)
    }

    throwBasicError(mess){
        throw new Error(mess);
    }
}