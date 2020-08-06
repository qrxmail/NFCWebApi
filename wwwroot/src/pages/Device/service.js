import request from '@/utils/request';

// // mock接口
// export async function queryDevice(params) {
//   return request('/api/device', {
//     params,
//   });
// }
// export async function removeDevice(params) {
//   return request('/api/device', {
//     method: 'POST',
//     data: { ...params, method: 'delete' },
//   });
// }
// export async function addDevice(params) {
//   return request('/api/device', {
//     method: 'POST',
//     data: { ...params, method: 'post' },
//   });
// }
// export async function updateDevice(params) {
//   return request('/api/device', {
//     method: 'POST',
//     data: { ...params, method: 'update' },
//   });
// }

// 后台api接口
export async function queryDevice(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/device/query?queryStr='+queryStr);
}
export async function removeDevice(params) {
  return request('/api/device/delete', {
    method: 'POST',
    data: { ...params},
  });
}
export async function addDevice(params) {
  return request('/api/device/add', {
    method: 'POST',
    data: { ...params},
  });
}
export async function updateDevice(params) {
  return request('/api/device/update', {
    method: 'POST',
    data: { ...params},
  });
}

// 设置设备巡检项目
export async function setDeviceInspectItems(params) {
  return request('/api/device/setdeviceinspectitems', {
    method: 'POST',
    data: { ...params},
  });
}

// 获取设备的巡检项目下拉选框数据和初始数据
export async function getDeviceInspectItemsDDL(params) {
  let queryStr = JSON.stringify(params);
  return request('/api/common/getdeviceinspectitemsddl?queryStr='+queryStr);
}



