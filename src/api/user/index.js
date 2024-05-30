import request from '@/utils/request';

/**
 * 登录接口
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function loginAPI(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: { username, password },
  });
}

/**
 * 获取用户信息接口
 */
export function userInfoAPI() {
  return request({
    url: '/api/user/info',
    method: 'get',
  });
}
