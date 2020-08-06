import request from '@/utils/request';

// 获取url中的参数
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
  return unescape(r[2]);
  }
  return null;
}

// 后台api接口
export async function queryInspectTask(params) {
  //let taskNo = getQueryString("taskNo");
  //params.taskNo = taskNo;
  let queryStr = JSON.stringify(params);
  return request('/api/inspecttask/querydetail?queryStr='+queryStr);
}
export async function removeInspectTask(params) {
  return request('/api/inspecttask/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addInspectTask(params) {
  return request('/api/inspecttask/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateInspectTask(params) {
  return request('/api/inspecttask/update', {
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









