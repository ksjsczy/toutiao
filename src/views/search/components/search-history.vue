<template>
  <div class="search-history" v-show="searchHistories.length > 0">
    <van-cell title="历史记录">
      <template #value v-if="isDeleteShow">
        <span @click="onClearAllClick">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <template #right-icon v-else>
        <van-icon name="delete-o" @click="isDeleteShow = true" />
      </template>
    </van-cell>
    <template v-for="(item, index) in searchHistories" :key="item">
      <van-cell :title="item" @click="onHistoryItemClick(item, index)">
        <template #right-icon v-if="isDeleteShow">
          <van-icon name="close" />
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  searchHistories: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['delete-history-item', 'clear-search-histories'])

const isDeleteShow = ref(false)

function onHistoryItemClick(item, index) {
  if (isDeleteShow.value) {
    //删除历史词条
    emit('delete-history-item', index)
  } else {
    //搜索词条
    emit('search', item)
  }
}

function onClearAllClick() {
  emit('clear-search-histories')
}
</script>

<style lang="less" scoped>
.search-history {
  .van-badge__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>