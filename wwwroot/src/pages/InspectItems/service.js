import request from '@/utils/request';

// 后台api接口
export async function queryInspectItems(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspectitems/query?queryStr='+queryStr);
}
export async function removeInspectItems(params) {
  return request('/api/inspectitems/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addInspectItems(params) {
  return request('/api/inspectitems/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateInspectItems(params) {
  return request('/api/inspectitems/update', {
    method: 'POST',
    data: { ...params},
  });
}


