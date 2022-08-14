import axios from 'axios'
import store from '@/store'

//创建axios实例
const request = axios.create({
  baseURL: 'http://geek.itheima.net',
})

//请求拦截器
request.interceptors.request.use(
  (config) => {
    if (config.url === '/v1_0/authorizations') return config
    const { user } = store.state
    config.headers.Authorization = `Bearer ${user?.token}`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request
