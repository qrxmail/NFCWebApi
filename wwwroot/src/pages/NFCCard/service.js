import request from '@/utils/request';

// 后台api接口
export async function queryNFCCard(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/nfccard/query?queryStr='+queryStr);
}
export async function removeNFCCard(params) {
  return request('/api/nfccard/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addNFCCard(params) {
  return request('/api/nfccard/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateNFCCard(params) {
  return request('/api/nfccard/update', {
    method: 'POST',
    data: { ...params},
  });
}


