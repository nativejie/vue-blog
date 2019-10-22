import request from '../utils/request'

// export function login(data){ return request.post('/login')}


export function getUser(){ return request.get('/api/admin/user/getUser?id=1')}
export function login(data){ return request.post('/api/admin/login', data)}
