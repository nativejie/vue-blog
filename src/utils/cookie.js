export class Cookie{
    constructor(){
    }
    /**
     * 
     * @param {string} key 
     * @param {object} value 
     * @param {number} expireDay 过期时间 小时
     */
    setCookie(key, value, expireDay){
        let exp = new Date();
        exp.setTime(exp.getTime() + expireDay * 60 * 60 * 1000);
        document.cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`;
    }
    getCookie(key){
        let reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        let arr=document.cookie.match(reg)
        return arr && arr.length > 1?unescape(arr[2]):'';
    }
    deleteCookie(key){
        let exp = new Date(); 
        exp.setTime(exp.getTime() - 60 * 60 * 1000); 
        let value = getCookie(key); 
        if (value != null) 
            document.cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`;
    }
}