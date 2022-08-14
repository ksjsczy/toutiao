<template>
  <div class="comment-list">
    <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              v-model:error="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad">
      <template v-for="item in list">
        <comment-item
                      @reply-click="$emit('reply-click', $event)"
                      @change-like-count="item.like_count = $event"
                      :comment="item"
                      :reply-btn-type="replyBtnType">
        </comment-item>
      </template>
    </van-list>
  </div>
</template>

<script setup>
import { getComments, addComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
// addComment({
//   target: props.source,
//   content: 'hello world',
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

const props = defineProps({
  source: {
    type: String,
    required: true
  },
  type: {
    type: String,
    validator: value => ['a', 'c'].includes(value),
    default: 'a'
  },
  replyBtnType: {
    type: [Number, String],
    default: 1
  }
})

const emit = defineEmits(['onload-success', 'reply-click'])

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const error = ref(false)
const offset = ref(null)

// //页面加载后就调用一次onLoad，用于获取评论数量
// onLoad()

async function onLoad() {
  loading.value = true
  try {
    const { data } = await getComments({
      type: props.type,
      source: props.source,
      offset: offset.value,
      limit: 10
    })
    // console.log(data)
    const { results, last_id } = data.data
    emit('onload-success', data.data)

    if (results.length > 0) {
      list.value.push(...results)
      offset.value = last_id
    } else {
      finished.value = true
    }
    loading.value = false
  } catch (err) {
    error.value = true
    loading.value = false
  }
}

defineExpose({
  list
})

</script>

<style lang="less" scoped>
</style>