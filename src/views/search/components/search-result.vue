<template>
  <div class="search-result">
    <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              v-model:error="requestError"
              error-text="请求失败，点击重新加载"
              @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>

  </div>
</template>

<script setup>
import { getSearchResults } from '@/api/search'

const props = defineProps({
  searchText: {
    type: String,
    default: ''
  }
})

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1)
const PER_PAGE = 20
const requestError = ref(false)

async function onLoad() {
  try {
    // if (Math.random() > 0.5) {
    //   //模拟请求发生错误
    //   throw new Error()
    // }
    //1.请求加载数据
    const { data } = await getSearchResults({
      page: page.value,
      per_page: PER_PAGE,
      q: props.searchText
    })
    //2.将数据添加到数组列表中
    const { results } = data.data
    list.value.push(...results)
    //3.将本次加载中的loading关闭
    loading.value = false
    //4.判断是否还有数据
    if (results.length) {
      //如果有，则更新获取下一个数据的页码
      page.value++
    } else {
      //如果没有，则将加载状态finished设置为结束  
      finished.value = true
    }
  } catch (err) {
    requestError.value = true
    loading.value = false
  }
};
</script>

<style lang="less" scoped>
</style>