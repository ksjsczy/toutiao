import request from '@/utils/request'

export function getComments(params) {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params,
  })
}

export function addComment(data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data,
  })
}

export function addCommentLiking(target) {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: { target },
  })
}

export function deleteCommentLiking(target) {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`,
  })
}
