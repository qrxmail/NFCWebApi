import request from '@/utils/request';

// 获取设备下拉选框数据
export async function getDevice() {
    return request('/api/common/getdevice');
}

// 获取设备的巡检项目下拉选框数据
export async function getDeviceInspectItems(params) {
    let queryStr = JSON.stringify(params);
    return request('/api/common/getdeviceinspectitems?queryStr=' + queryStr);
}

// 获取巡检项目下拉选框数据
export async function getInspectItems() {
    return request('/api/common/getinspectitems');
}

// 获取巡检点下拉选框数据
export async function getInspect() {
    return request('/api/common/getinspect');
}

// 获取巡检人下拉选框数据
export async function getUser() {
    return request('/api/common/getinspectuser');
}

// 获取巡检项目树数据
export async function getInspectItemTree() {
    return request('/api/common/getinspectitemtree');
}

// 获取巡检线路下拉选框数据
export async function getInspectLine() {
    return request('/api/common/getinspectline');
}

// 获取巡检周期下拉选框数据
export async function getInspectCycles() {
    return request('/api/common/getinspectcycles');
}



