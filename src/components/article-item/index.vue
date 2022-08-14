<template>
  <div class="article-item">
    <van-cell :to="`article/${article.art_id}`">
      <template #title>
        <div class="title van-multi-ellipsis--l2">{{ article.title }}
        </div>
      </template>
      <template #label>
        <div class="label">
          <template v-if="article.cover.type === 3">
            <div class="cover-wrap">
              <template v-for="img in article.cover.images" :key="img">
                <van-image
                           class="main-cover"
                           fit="cover"
                           :src="img" />
              </template>
            </div>
          </template>
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ timeFormatterFromNow(article.pubdate) }}</span>
        </div>
      </template>
      <template #value v-if="article.cover.type === 1">
        <van-image
                   class="right-cover"
                   fit="cover"
                   :src="article.cover.images[0]" />
      </template>
    </van-cell>
  </div>
</template>

<script setup>
import { timeFormatterFromNow } from '@/utils/dayjs'

const prop = defineProps({
  article: {
    type: Object,
    required: true
  }
})
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .label span {
    font-size: 23px;
    margin-right: 25px;
    color: #b4b4b4;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .main-cover {
    width: 232px;
    height: 146px;
    margin-right: 4px;
  }

  .main-cover:last-child {
    margin-right: 0;
  }

  /deep/ .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .cover-wrap {
    display: flex;
    margin: 30px 0;
  }
}
</style>