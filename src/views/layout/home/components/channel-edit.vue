<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
                  @click="isEdit = !isEdit"
                  class="edit-btn"
                  color="#f85959"
                  type="danger"
                  size="mini"
                  plain
                  round>
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
                     v-for="(item, index) in myChannels"
                     :key="item.id"
                     @click="onMyChannelClick(item, index)">
        <template #text>
          <span class="van-grid-item__text" :class="{ active: index === active }">{{ item.name }}</span>
        </template>
        <template #icon>
          <van-icon name="close" v-show="isEdit && !fixedChannel.includes(item.id)" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
                     v-for="item in recommendChannels"
                     :key="item.id"
                     icon="plus"
                     :text="item.name"
                     @click="onAddChannel(item)" />
    </van-grid>
  </div>
</template>

<script setup>
import { addUserChannel } from '@/api/channel'
import localCache from '@/utils/localCache.js';
import { Toast } from 'vant';
import { useStore } from 'vuex';
const prop = defineProps({
  allChannels: {
    type: Array,
    default: []
  },
  myChannels: {
    type: Array,
    default: []
  },
  active: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update-active'])
const store = useStore()

const isEdit = ref(false)
const fixedChannel = ref([0])

const recommendChannels = computed(() => {
  return prop.allChannels.filter(channel => {
    return !prop.myChannels.find(myChannel => {
      return myChannel.id === channel.id
    })
  })
})

function onAddChannel(channel) {
  prop.myChannels.push(channel)
  updateMyChannel()
}

function onMyChannelClick(channel, index) {
  if (isEdit.value && fixedChannel.value.includes(channel.id)) return
  emit('update-active', index, isEdit.value)
}

async function updateMyChannel() {
  try {
    if (store.state.user) {
      //已登录
      const addChannelArray = prop.myChannels.map((channel, index) => {
        return {
          id: channel.id,
          seq: index + 1
        }
      })
      await addUserChannel(addChannelArray)
    } else {
      //未登录
      localCache.set('TOUTIAO_MYCHANNELS', prop.myChannels)
    }
  } catch (err) {
    Toast.fail('添加频道失败，请稍后重试')
  }
}

defineExpose({
  updateMyChannel
})
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 86px 0;

  /deep/.van-cell {
    border-bottom: none;

    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }

    .van-cell__value {
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }

  /deep/ .my-grid {
    .van-icon-close {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      z-index: 2;
    }
  }

  /deep/ .van-grid-item {
    .van-grid-item__content {
      width: 160px;
      height: 86px;
      flex-direction: row;
      background-color: #f4f5f6;

      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }

      .van-badge__wrapper {
        position: unset;

        .van-icon-close {
          position: absolute;
        }
      }
    }
  }

  .active {
    color: #f85959;
  }
}
</style>