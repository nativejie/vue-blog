/**
 * 过滤器
 */
import * as utils from '@/utils/'
export function formatDate(date, fmt){
    return utils.parseTime(date, fmt);
}