import request from '@/utils/request'

export function getSearchSuggestions(q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q,
    },
  })
}

export function getSearchResults(params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params,
  })
}
