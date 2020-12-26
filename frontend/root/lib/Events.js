class Events{

    constructor() {
    }

    catchingEventsLogs(name="log",element,eventsList){
        for (let event in eventsList){
            element.addEventListener(
                event,
                function (ev){
                    let tags = {};
                    for (let property in ev) {
                        let tagValue = "";
                        if (typeof ev[property] ==="string"){
                            tagValue = '"'+ev[property]+'"';
                            tagValue.replaceAll(" ", "_");
                        }
                        else if (typeof ev[property] === "number" || typeof ev[property] ==="boolean"){
                            tagValue= ev[property]
                        }
                        if (tagValue !== ""){
                            tags[property] = tagValue;
                        }
                    }
                    return new Measurement(name, '"'+ev.type+'"', tags)
                })
        }
    }
}