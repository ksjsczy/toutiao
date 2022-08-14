import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

export default dayjs

export function timeFormatterFromNow(time) {
  return dayjs(time).fromNow()
}
