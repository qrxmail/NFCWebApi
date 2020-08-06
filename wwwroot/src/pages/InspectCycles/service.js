import request from '@/utils/request';

// 后台api接口
export async function queryInspectCycles(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspectcycles/query?queryStr='+queryStr);
}
export async function removeInspectCycles(params) {
  return request('/api/inspectcycles/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addInspectCycles(params) {
  return request('/api/inspectcycles/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateInspectCycles(params) {
  return request('/api/inspectcycles/update', {
    method: 'POST',
    data: { ...params},
  });
}


