/**
 * Create By JieZhou 
 */


export function genUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * 
 * @param {Object|string|number} time 
 * @param {stirng} format 格式 y:年 M:月 d:日 H:小时 m:分钟 s:秒 a:日期
 * @returns {string} 
 */
export function parseTime(time, dFormat){
    if(arguments.length == 0){
        return null;
    }
    const format = dFormat || '{y}-{M}-{d} {H}:{m}:{s}';
    let date;
    if(typeof time === 'object'){
        date = time;
    }else{
        if((typeof time === 'string') && (/^[0-9]+$/.test(time))){
            time = parseInt(time)
        }
        if((typeof time === 'number') && (time.toString().length === 10)){
            time = time * 1000;
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|M|d|H|m|s|a)}/g, (result, key) => {
        let value = formatObj[key]
        if(key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]}
        if(result.length > 0 && value < 10){
            value = `0${value}`
        }
        return value || 0
    })
    return time_str
}

/**
 * 将HTML转换成Text
 * @param {string} val 
 */
export function html2Text(val){
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

/**
 * 防抖
 * @param {Function} fn 
 * @param {number} wait 等待时长
 * @param {boolean} immediate 是否立即执行
 */
export function debounce(fn, wait = 500, immediate = false){
    // startTimeStamp触发的时间
    let timer, startTimeStamp = 0;
    let context, args;
    let run = (timerInterval) => {
        timer = setTimeout(() => {
            let now = (new Date()).getTime();
            // 触发的时间间隔
            let interval = now - startTimeStamp
            // 如果小于设定的间隔 wait
            if(interval < timerInterval && interval > 0){
                startTimeStamp = now;
                // 递归调用设置定时器 直到时间满足
                run(timerInterval - interval)
            }else{
                clearTimeout(timer);
                timer = null;
                if(!immediate){
                    fn.apply(context, args);
                }
            }
        }, timerInterval)
    }

    return function(){
        context = this;
        args = arguments;
        startTimeStamp = (new Date()).getTime();
        if(!timer){
            console.log('debounce set', wait);
            if(immediate){
                fn.apply(context, args);
            }
            run(wait)
        }
    }
}

/**
 * 节流
 * @param {Function} fn 
 * @param {number} wait 等待时长
 * @param {boolean} immediate 是否立即执行
 */
export function throttling(fn, wait = 500, immediate = false){
    let timer;
    let context, args;
    let run = () => {
        timer = setTimeout(() => {
            if(!immediate){
                fn.apply(context, args);
            }
            clearTimeout(timer);
            timer = null;
        }, wait)
    }

    return function(){
        context = this;
        args = arguments;
        if(!timer) {
            if(immediate){
                fn.apply(context, args);
            }
            run();
        }else{
            console.log('throttle, ignore')
        }
    }
}

/**
 * 深拷贝
 * @param {Object} obj 
 */
export function deepCopy(obj){
    if(!obj && typeof obj !== 'object') {
        throw new Error('参数错误', 'deepCopy')
    }
    let newObj = obj instanceof Array? []:{};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = typeof obj[key] === 'object'?deepCopy(obj[key]):obj[key];
        }
    }
    return newObj;
}

/**
 * 数组去重
 * @param {Array} arr 
 */
export function uniqueArr(arr){
    return Array.from(new Set(arr))
}
