import request from '@/utils/request';

export async function getMenuData() {
  return request('/api/system/menu');
}
