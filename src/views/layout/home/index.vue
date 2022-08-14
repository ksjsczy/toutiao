<template>

  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
                    class="search-btn"
                    type="primary"
                    size="small"
                    round
                    icon="search"
                    to="/search">
          <template #>
            <span class="text">搜索</span>
          </template>
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model:active="active" animated swipeable>
      <template v-for="item in myChannels" :key="item.id">
        <van-tab :title="item.name">
          <article-list :channel="item"></article-list>
        </van-tab>
      </template>
      <template #nav-right>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="place-holder"></div>
      </template>
    </van-tabs>

    <!-- 编辑导航栏显示的频道 -->
    <van-popup
               v-model:show="isChannelEditShow"
               closeable
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '100%' }">
      <channel-edit
                    ref="channelEditRef"
                    :all-channels="allChannels"
                    :my-channels="myChannels"
                    :active="active"
                    @update-active="onUpdateActive">
      </channel-edit>
    </van-popup>
  </div>
</template>

<script setup>
import { getUserChannels, getAllChannels } from '@/api/channel'
import { Toast } from 'vant';
import { useStore } from 'vuex';
import ChannelEdit from './components/channel-edit.vue';
import localCache from '@/utils/localCache';

const store = useStore()
const active = ref(0);
const isChannelEditShow = ref(false)

const myChannels = ref([])
const allChannels = ref([])

const channelEditRef = ref(null)

//获取所有频道
getAllChannels()
  .then(res => {
    allChannels.value = res.data.data.channels
  })
  .catch(err => {
    Toast.fail('获取频道列表失败666')
  })

//获取用户频道
if (store.state.user) {
  //已登录
  getUserChannels()
    .then(res => {
      myChannels.value = res.data.data.channels
    })
    .catch(err => {
      Toast.fail('用户频道列表加载失败');
    })
} else {
  //未登录
  let channels = localCache.get('TOUTIAO_MYCHANNELS')
  if (!channels) {
    getAllChannels()
      .then(res => {
        myChannels.value = res.data.data.channels
      })
      .catch(err => {
        Toast.fail('获取频道列表失败666')
      })
  } else {
    myChannels.value = channels
  }
}

function onUpdateActive(index, isEdit) {
  if (isEdit) {
    if (index <= active.value) active.value--
    myChannels.value.splice(index, 1)
    channelEditRef.value.updateMyChannel()
  } else {
    active.value = index
    isChannelEditShow.value = false
  }
}

</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
  padding-top: 174px;

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;

    .text {
      font-size: 28px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;

      .van-tabs__nav {
        padding-bottom: 0;

        .van-tab {
          min-width: 200px;
          // height: 82px;
          border-right: 1px solid #edeff3;
          font-size: 30px;
          color: #777;
        }

        .van-tab--active {
          color: #333;
        }

        .van-tabs__line {
          bottom: 8px;
          width: 31px;
          height: 6px;
          background-color: #3296fa;
        }
      }
    }

    .hamburger-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.9;

      &::before {
        position: absolute;
        left: 0;
        content: "";
        width: 1px;
        height: 82px;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }

      .toutiao-gengduo {
        font-size: 33px;
      }
    }

    .place-holder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>