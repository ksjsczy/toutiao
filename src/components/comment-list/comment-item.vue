<template>
  <div class="comment-item">
    <van-cell title="单元格">
      <template #title>
        <div class="title">
          <div class="author">{{ comment.aut_name }}</div>
          <van-button
                      class="like-count"
                      :class="{ 'liking': comment.is_liking }"
                      :loading="loading"
                      @click="onCommentLike">
            <div class="like-count-content">
              <van-icon :name="comment.is_liking ? 'good-job' : 'good-job-o'" />
              {{ comment.like_count ? '&nbsp;' : '' }}{{ comment.like_count || '赞' }}
            </div>
          </van-button>
        </div>
      </template>
      <template #label>
        <div class="label">
          <div class="main-content">{{ comment.content }}</div>
          <div class="bottom-content">
            <div class="pub-date">{{ timeFormatterFromNow(comment.pubdate) }}</div>
            <!-- 展示回复按钮，显示回复数量 -->
            <van-button v-if="replyBtnType == 1" @click="$emit('reply-click', comment)" class="reply-btn" round>
              {{ comment.reply_count }}回复
            </van-button>
            <!-- 展示回复按钮，不显示回复数量 -->
            <van-button v-else-if="replyBtnType == 2" @click="$emit('reply-click', comment)" class="reply-btn" round>
              回复
            </van-button>
          </div>
        </div>
      </template>
      <template #icon>
        <van-image
                   fit="cover"
                   class="cover"
                   round
                   :src="comment.aut_photo" />
      </template>
    </van-cell>
  </div>
</template>

<script setup>
import { timeFormatterFromNow } from '@/utils/dayjs.js'
import { addCommentLiking, deleteCommentLiking } from '@/api/comment'
import { Toast } from 'vant';

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  replyBtnType: {
    type: [Number, String],
    default: 1
  }
})

const emit = defineEmits(['change-like-count', 'reply-click'])

const loading = ref(false)

async function onCommentLike() {
  loading.value = true
  try {
    if (props.comment.is_liking) {
      //已经点赞，则取消点赞
      await deleteCommentLiking(props.comment.com_id)
      emit('change-like-count', props.comment.like_count - 1)
    } else {
      await addCommentLiking(props.comment.com_id)
      emit('change-like-count', props.comment.like_count + 1)
    }
    props.comment.is_liking = !props.comment.is_liking
  } catch (err) {
    Toast.fail('点赞评论失败，请重试')
  }
  loading.value = false
}

// const showLikeContent = computed(() => {
//   return props.comment.like_count === 0 ? '赞' : props.comment.like_count
// })
</script>

<style lang="less" scoped>
.comment-item {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author {
      font-size: 26px;
      color: #406599;
    }

    .liking {
      color: #e5645f;
    }

    .like-count {

      width: unset;
      height: unset;
      font-size: 20px;
      vertical-align: middle;
      border: none;
      padding: 0;

      .van-icon {
        font-size: 30px;
      }

      .like-count-content {
        display: flex;
        justify-content: start;
        align-items: center;
        min-width: 60px;
      }

    }
  }

  .cover {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }

  .label {
    color: #000;

    .main-content {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .bottom-content {
      display: flex;
      justify-content: start;
      align-items: center;

      .reply-btn {
        // width: 136px;
        height: 48px;
        font-size: 23px;
        margin-left: 25px;
        background-color: #f4f5f6;
      }
    }
  }
}
</style>