<template>
  <div class="search-suggestion">
    <template v-for="item in suggestions">
      <van-cell icon="search" @click="onSuggestionClick(item)">
        <template #title>
          <div v-html="hightlight(item)"></div>
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script setup>
import { getSearchSuggestions } from '@/api/search'
import { Toast } from 'vant';
import { debounce } from 'lodash'

const props = defineProps({
  searchText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search'])

const suggestions = ref([])

watch(
  () => props.searchText,
  debounce((value) => {
    // console.log('发出了一次请求，内容为：', value)
    loadSearchSuggestions(value)
  }, 300),
  { immediate: true }
)

async function loadSearchSuggestions(value) {
  try {
    const { data } = await getSearchSuggestions(value)
    suggestions.value = data.data.options
  } catch (err) {
    Toast.fail('请求联想数据失败')
  }
}

//在联想建议中高亮搜索字符串
function hightlight(text) {
  const hightlightStr = `<span style="color: red;">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text?.replace(reg, hightlightStr)
}

//点击了联想建议
function onSuggestionClick(suggestion) {
  emit('search', suggestion)
}
</script>

<style lang="less" scoped>
</style>