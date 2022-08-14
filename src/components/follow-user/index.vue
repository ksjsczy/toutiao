<template>
  <div class="follow-user">
    <div v-if="isFollowed">
      <van-button
                  class="is-follow toutiao-btn follow-btn"
                  round
                  size="small"
                  @click="onFollowBtnClick"
                  :loading="loading">
        <span class="follow-text">已关注</span>
      </van-button>
    </div>
    <div v-else>
      <van-button
                  class="toutiao-btn follow-btn"
                  round
                  size="small"
                  :color="buttonColor"
                  @click="onFollowBtnClick"
                  :loading="loading">
        <van-icon name="plus" />
        <span class="follow-text">关注</span>
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { addFollow, deleteFollow } from '@/api/user'
import { Toast } from 'vant';
const loading = ref(false)

const props = defineProps({
  isFollowed: {
    type: Boolean,
    required: true
  },
  authorId: {
    type: [String, Number, Object],
    required: true
  },
  buttonColor: {
    type: String,
    default: '#3296fa'
  }
})

const emit = defineEmits(['update:is-followed'])

async function onFollowBtnClick() {
  loading.value = true
  try {
    if (props.isFollowed) {
      //取消关注
      await deleteFollow(props.authorId)
      // console.log('取消关注', res)
    } else {
      //关注
      await addFollow(props.authorId)
      // console.log('关注', res)
    }
    emit('update:is-followed', !props.isFollowed)
    // article.value.is_followed = !article.value.is_followed
  } catch (err) {
    console.log(err)
    let message = '关注失败，请重试'
    if (err?.response?.status === 400) {
      message = '你不能关注你自己'
    }
    Toast.fail(message)
  }
  loading.value = false
}
</script>

<style lang="less" scoped>
.follow-user {
  .follow-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 58px;

    .van-icon-plus {
      font-size: 22px;
      margin-right: 8px;
    }
  }

  .is-follow {
    color: #555 !important;
    background-color: #fff !important;
    border: 1px solid #ccc !important;
  }
}
</style>