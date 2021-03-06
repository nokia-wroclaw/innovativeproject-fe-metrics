
export function catchingErrors(errorEvent,measurementName='error') {
        //errorEvent.preventDefault();
        //errorEvent.stopImmediatePropagation();
        //console.log(errorEvent.message);
        let tags = {};
        for (let property in errorEvent) {
            if (typeof errorEvent[property] === "object") {
                tags[property] = '"' + errorEvent[property].constructor.name + '"';
            } else if (typeof errorEvent[property] === "string") {
                let string = '"' + errorEvent[property] + '"';
                if (!string.includes("[native")) {
                    tags[property] = string.replaceAll(" ", "_");
                }
            } else if (typeof errorEvent[property] === "number" || typeof errorEvent[property] === "boolean") {
                tags[property] = errorEvent[property];
            }
        }
        return [measurementName, '"'+errorEvent.message+'"', tags]
    }

export function throwBasicError(mess){
        throw new Error(mess);
    }
