import request from '@/utils/request'
export function uploadImage(data){ return request.post('/api/admin/uploadImage', data, {headers: {post: {'Content-Type': 'multipart/form-data'}}})}