import request from '@/utils/request';

// 后台api接口
export async function queryInspectTask(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/inspecttask/query?queryStr='+queryStr);
}

export async function removeInspectTaskByNo(params) {
  return request('/api/inspecttask/deletebyno', {
    method: 'POST',
    data: { ...params},
  });
}

export async function addBatchTask(params) {
  return request('/api/inspecttask/addbatchtask', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addLineTask(params) {
  return request('/api/inspecttask/addlinetask', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addTempTask(params) {
  return request('/api/inspecttask/addtemptask', {
    method: 'POST',
    data: { ...params},
  });
}










