import request from '@/utils/request';

// 后台api接口
export async function queryInspectLine(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspectline/query?queryStr='+queryStr);
}
export async function removeInspectLine(params) {
  return request('/api/inspectline/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addInspectLine(params) {
  return request('/api/inspectline/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateInspectLine(params) {
  return request('/api/inspectline/update', {
    method: 'POST',
    data: { ...params},
  });
}


