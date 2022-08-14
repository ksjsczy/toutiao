<template>
  <div class="comment-post">
    <van-field
               v-model.trim="message"
               rows="2"
               autosize
               type="textarea"
               maxlength="50"
               placeholder="请输入评论内容"
               show-word-limit>
      <template #extra>
        <van-button
                    size="small"
                    type="primary"
                    plain
                    @click="onPost"
                    :disabled="!message.length">发布
        </van-button>
      </template>
    </van-field>
  </div>
</template>

<script setup>
import { addComment } from '@/api/comment'
import { Toast } from 'vant';


const props = defineProps({
  target: {
    type: [String, Number, Object],
    required: true
  },
  art_id: {
    type: [String, Number, Object],
    default: null
  },
  additionalMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['on-post-comment'])

const message = ref('')
const articleId = inject('articleId')

async function onPost() {
  Toast.loading({
    forbidClick: true,
    message: '发布中...',
  })
  try {
    const { data } = await addComment({
      target: props.target,
      content: message.value + props.additionalMessage,
      art_id: props.art_id
    })
    // console.log(data)
    Toast.success('成功发表评论')
    emit('on-post-comment', data.data.new_obj)
    message.value = ''
  } catch (err) {
    Toast.fail('发表评论失败，请重试！')
    emit('on-post-comment', null)
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  /deep/.van-cell {
    align-items: center;

    .van-field__value {
      background-color: #f4f5f6;
      padding: 20px;
    }

    .van-button {
      padding: 0;
      border: none;
      font-size: 30px;
      margin-left: 30px;
    }
  }
}
</style>