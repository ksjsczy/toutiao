<template>
  <div class="article-list">
    <van-pull-refresh
                      v-model="refreshLoading"
                      @refresh="onRefresh"
                      :success-text="refreshText"
                      :success-duration="800">
      <van-list
                v-model:loading="loading"
                v-model:error="requestError"
                error-text="请求失败，点击重新加载"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <template v-for="item in list" :key="item.art_id">
          <article-item :article="item"></article-item>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue';

const prop = defineProps({
  channel: {
    type: Object,
    required: true
  }
})
const list = ref([]);
const loading = ref(false);  //下拉加载更多
const finished = ref(false);
const timestamp = ref(null)
const requestError = ref(false);
const refreshLoading = ref(false)  //上拉刷新
const refreshText = ref('刷新成功')

async function onLoad() {
  try {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    const res = await getArticles({
      channel_id: prop.channel.id,
      timestamp: timestamp ?? Date.now()
    })
    const { pre_timestamp, results } = res.data.data
    list.value.push(...results)

    // if (Math.random() > 0.5) {
    //   //模拟请求发生错误
    //   throw new Error()
    // }

    // 加载状态结束
    loading.value = false
    // 数据全部加载完成
    if (results) {
      timestamp.value = pre_timestamp
    } else {
      finished.value = true
    }
  } catch (err) {
    loading.value = false
    requestError.value = true
  }
}
async function onRefresh() {
  try {
    const res = await getArticles({
      channel_id: prop.channel.id,
      timestamp: Date.now()
    })
    // if (Math.random() > 0.5) {
    //   //模拟请求发生错误
    //   throw new Error()
    // }
    const { results } = res.data.data
    list.value.unshift(...results)
    refreshText.value = `刷新成功，加载了${results.length}条数据`
    refreshLoading.value = false
  } catch (err) {
    refreshText.value = `刷新失败`
    refreshLoading.value = false
  }
};
</script>

<style lang="less" scoped>
.article-list {
  height: calc(100vh - 137px);
  width: 100%;
  overflow-y: auto;
}
</style>