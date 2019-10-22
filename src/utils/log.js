/**
 * 日志处理
 */
import Vue from 'vue'
import {errorLog} from '@/settings'

function needLog(){
    const env = process.env.NODE_ENV
    if(errorLog instanceof Array){
        return needLog.includes(env)
    }

    if(errorLog instanceof String){
        return env == errorLog;
    }
    return false;
}

if(needLog()){
    // 错误日志记录
    Vue.config.errorHandler = function(err, vm, info) {

    }
    // 警告日志记录 
    Vue.config.warnHandler = function (msg, vm, trace) {
  
    }
}

