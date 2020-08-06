import request from '@/utils/request';

// 后台api接口
export async function queryInspect(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspect/query?queryStr='+queryStr);
}
export async function removeInspect(params) {
  return request('/api/inspect/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addInspect(params) {
  return request('/api/inspect/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateInspect(params) {
  return request('/api/inspect/update', {
    method: 'POST',
    data: { ...params},
  });
}


