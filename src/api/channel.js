import request from '@/utils/request'

//获取用户的频道
export function getUserChannels() {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
  })
}

//获取所有频道
export function getAllChannels() {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
  })
}

//修改频道
export function addUserChannel(channels) {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels: [...channels],
    },
  })
}
