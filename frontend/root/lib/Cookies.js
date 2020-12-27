export default class  Cookies{

    constructor() {
    }
    setCookie(cname, cvalue) {
        //var d = new Date();
        //d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        //var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue //+ ";" + expires + ";path=/";
    }

    getCookie(cname) {
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

    checkCookie() {
        let addr = getCookie("database_address");
        let bucket = getCookie("bucket")
        return !((addr === "") || (bucket === ""));
    }
}

