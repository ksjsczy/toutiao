<template>
  <div class="comment-reply">
    <van-nav-bar :title="showTitle">
      <template #left>
        <van-icon name="cross" @click="$emit('comment-reply-close')" />
      </template>
    </van-nav-bar>
    <div class="comment-wrap">
      <!-- 当前评论 -->
      <comment-item :comment="comment" :reply-btn-type="3"></comment-item>
      <van-cell title="全部回复" />
      <!-- 评论回复 -->
      <comment-list
                    @reply-click="onReplyClick"
                    ref="commentListRef"
                    :source="comment.com_id"
                    type="c"
                    :reply-btn-type="2">
      </comment-list>
    </div>
    <!-- 发表回复 -->
    <div class="post-wrap">
      <van-button
                  class="reply-btn"
                  size="small"
                  round
                  @click="onPostClick">写评论</van-button>
    </div>
    <van-popup v-model:show="isPostShow" position="bottom">
      <comment-post
                    :target="comment.com_id"
                    :art_id="artId"
                    :additional-message="additionalMessage"
                    @on-post-comment="onPostComment"></comment-post>
    </van-popup>
  </div>
</template>

<script setup>
import { COLLAPSE_KEY } from 'vant/lib/collapse/Collapse';
import CommentItem from '../comment-list/comment-item.vue';
import CommentList from '../comment-list/index.vue';
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const artId = inject('articleId')

const isPostShow = ref(false)
const commentListRef = ref(null)
const additionalMessage = ref('')

const showTitle = computed(() => {
  return props.comment.reply_count > 0 ? props.comment.reply_count + '条回复' : '暂无回复'
})

const emit = defineEmits(['comment-reply-close'])

//提交评论后
function onPostComment(newComment) {
  //关闭弹出层
  isPostShow.value = false
  //如果发布成功，将发布内容显示到列表顶部
  if (newComment) commentListRef.value.list.unshift(newComment)
}

//点击写评论
function onPostClick() {
  additionalMessage.value = ''
  isPostShow.value = true
}

//点击评论中的回复
function onReplyClick(comment) {
  console.log(666, comment)
  additionalMessage.value = `//@${comment.aut_name}: ${comment.content}`
  isPostShow.value = true
}
</script>

<style lang="less" scoped>
.comment-reply {
  .comment-wrap {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
  }

  .post-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;

    .reply-btn {
      width: 60%;
    }
  }
}
</style>