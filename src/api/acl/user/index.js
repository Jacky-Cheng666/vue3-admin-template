import request from '@/utils/request';

// 用户列表
export function userListAPI() {
  return request({
    url: '/api/user/list',
    method: 'get',
  });
}
