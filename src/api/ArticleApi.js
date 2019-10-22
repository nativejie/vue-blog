import request from '@/utils/request'
export function getAllArticle(){ return request.get('/api/admin/article/getAllArticle')}
export function createArticle(data){ return request.post('/api/admin/article/createArticle', data)}
export function updateArticle(data){ return request.post('/api/admin/article/updateArticle', data)}
export function getArticle(id){ return request.get('/api/admin/article/getArticle?id=' + id)}
export function getHotArticle(){ return request.get('/api/admin/article/getHotArticle')}
export function getNewArticle(){ return request.get('/api/admin/article/getNewArticle')}
export function getAllType(){ return request.get('/api/admin/type/getAllType')}
export function createType(data){ return request.post('/api/admin/type/createType', data)}
