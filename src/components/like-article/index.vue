<template>
  <div class="like-article">
    <van-button
                class="like-btn"
                :class="{ 'active': attitude === 1 }"
                :icon="attitude === 1 ? 'good-job' : 'good-job-o'"
                @click="onLikeBtnClick"
                :loading="loading">
    </van-button>
  </div>
</template>

<script setup>
import { addLiking, deleteLiking } from '@/api/article'
import { Toast } from 'vant';

const props = defineProps({
  attitude: {
    type: Number,
    required: true
  },
  articleId: {
    type: [Number, String, Object],
    required: true
  }
})

const emit = defineEmits(['update:attitude'])

const loading = ref(false)

async function onLikeBtnClick() {
  loading.value = true
  try {
    if (props.attitude === 1) {
      //取消点赞
      await deleteLiking(props.articleId)
      // console.log(res)
    } else {
      //点赞
      await addLiking(props.articleId)
      // console.log(res)
    }
    Toast.success(props.attitude === 1 ? '取消点赞' : '点赞成功')
    emit('update:attitude', props.attitude === 1 ? -1 : 1)
  } catch (err) {
    Toast.fail('点赞操作失败')
  }
  loading.value = false
}
</script>

<style lang="less" scoped>
.like-article {
  display: flex;
  justify-content: center;
  align-items: center;

  .like-btn {
    width: 40px;
    height: 40px;
    border: none;
    color: #777;
    padding: 0;
  }

  /deep/.active {
    .van-icon {
      color: #e3735d !important;
    }
  }
}
</style>