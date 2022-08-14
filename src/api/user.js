import request from '@/utils/request'
import store from '@/store'

//登录账号
export function login(data) {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  })
}

//模拟发送验证码
export function sendSms(mobile) {
  console.log(`手机尾号${mobile.slice(-4)}的验证码为246810`)
}

//获取用户自己的个人信息
export function getUserInfo() {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}

//关注用户
export function addFollow(target) {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target },
  })
}

//取消关注用户
export function deleteFollow(target) {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  })
}

//获取用户个人简介
export function getUserProfile() {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile',
  })
}

//更新用户个人简介
export function updateUserProfile(data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data,
  })
}

export function updateUserAvatar(data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data,
  })
}
