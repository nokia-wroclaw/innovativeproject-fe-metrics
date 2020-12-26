class Events{

    constructor() {
    }

    catchingEventsLogs(){
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
        prepareQuery('log','"'+ev.type+'"',tags);
    }
}