<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar route class="tab-bar">
      <van-tabbar-item
                       to="/home">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item
                       to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item
                       to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item
                       to="/user">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.layout {
  .tab-bar {
    i.toutiao {
      font-size: 40px;
    }

    .text {
      font-size: 20px;
    }
  }
}
</style>