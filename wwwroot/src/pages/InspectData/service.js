import request from '@/utils/request';

// 后台api接口
export async function queryInspectData(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspectdata/query?queryStr='+queryStr);
}
export async function removeInspectData(params) {
  return request('/api/inspectdata/delete', {
    method: 'POST',
    data: { ...params},
  });
}

export async function updateInspectData(params) {
  return request('/api/inspectdata/update', {
    method: 'POST',
    data: { ...params},
  });
}

export async function addInspectData(params) {
  return request('/api/inspectdata/add', {
    method: 'POST',
    data: { ...params},
  });
}








