<template>
  <div class="collect-article">
    <van-button
                class="collect-btn"
                :class="{ 'active': isCollected }"
                :icon="isCollected ? 'star' : 'star-o'"
                @click="onCollectBtnClick"
                :loading="loading">
    </van-button>
  </div>
</template>

<script setup>
import { addCollect, deleteCollect } from '@/api/article'
import { Toast } from 'vant';

const props = defineProps({
  isCollected: {
    type: Boolean,
    required: true
  },
  articleId: {
    type: [String, Number, Object],
    required: true
  }
})

const emit = defineEmits(['update:is-collected'])

const loading = ref(false)

async function onCollectBtnClick() {
  loading.value = true
  try {
    if (!props.isCollected) {
      //收藏
      await addCollect(props.articleId)
    } else {
      //取消收藏
      await deleteCollect(props.articleId)
    }
    Toast.success(props.isCollected ? '取消收藏' : '收藏成功')
    emit('update:is-collected', !props.isCollected)
  } catch (err) {
    Toast.fail('操作收藏失败')
  }
  loading.value = false
}
</script>

<style lang="less" scoped>
.collect-article {
  display: flex;
  justify-content: center;
  align-items: center;

  .collect-btn {
    width: 40px;
    height: 40px;
    border: none;
    color: #777;
    padding: 0;
  }

  /deep/.active {
    .van-icon {
      color: #f1a039 !important;
    }
  }
}
</style>