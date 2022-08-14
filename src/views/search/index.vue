<template>
  <div class="search">
    <form action="/">
      <van-search
                  v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow = false" />
    </form>
    <!-- 搜索结果 -->
    <search-result
                   v-if="isResultShow"
                   :search-text=searchText>
    </search-result>

    <!-- 搜索联想 -->
    <search-suggestion
                       v-else-if="searchText"
                       :search-text="searchText"
                       @search="onSearch">
    </search-suggestion>


    <!-- 搜索历史 -->
    <search-history
                    v-else
                    :search-histories="searchHistories"
                    @search="onSearch"
                    @delete-history-item="deleteHistoryItem"
                    @clear-search-histories="clearSearchHistories">
    </search-history>
  </div>
</template>

<script setup>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import localCache from '@/utils/localCache'

const router = useRouter()

const isResultShow = ref(false)
const searchText = ref('')
const searchHistories = ref(localCache.get('TOUTIAO_SEARCH_HISTORIES') ?? [])

watch(() => [...searchHistories.value], () => {
  localCache.set('TOUTIAO_SEARCH_HISTORIES', searchHistories.value)
})

function onSearch(value) {
  //更新搜索文本
  searchText.value = value

  //将搜索文本添加到搜索历史中
  const index = searchHistories.value.indexOf(value)
  if (index !== -1) searchHistories.value.splice(index, 1)
  searchHistories.value.unshift(value)
  if (searchHistories.value.length > 10) searchHistories.value.pop()

  //展示搜索结果
  isResultShow.value = true
}

function onCancel() {
  router.back()
}

//删除历史词条
function deleteHistoryItem(index) {
  searchHistories.value.splice(index, 1)
}

//清空搜索历史
function clearSearchHistories() {
  searchHistories.value = []
}

</script>

<style lang="less" scoped>
.search {
  /deep/.van-search__action {
    color: #fff;

    &:active {
      background-color: unset;
    }
  }
}
</style>