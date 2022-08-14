import request from '@/utils/request'

export function getArticles(params) {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params,
  })
}

export function getArticleById(articleId) {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`,
  })
}

export function addCollect(target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target },
  })
}

export function deleteCollect(target) {
  return request({
    method: 'delete',
    url: `/v1_0/article/collections/${target}`,
  })
}

export function addLiking(target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: { target },
  })
}

export function deleteLiking(target) {
  return request({
    method: 'delete',
    url: `/v1_0/article/likings/${target}`,
  })
}
