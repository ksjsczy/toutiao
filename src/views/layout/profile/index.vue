<template>
  <div class="profile">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="infomation">
        <div class="left">
          <van-image
                     class="avatar"
                     round
                     fit="cover"
                     :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <van-button
                    to="/user/profile"
                    class="toutiao-btn"
                    round
                    size="mini">编辑资料</van-button>
      </div>
      <div class="statistics">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="img" src="@/assets/mobile.png" alt="">
        <span class="text">登陆 / 注册</span>
      </div>
    </div>

    <!-- 收藏、历史 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
        <template #text>
          <span class="text">收 藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
        <template #text>
          <span class="text">历 史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知、小智同学、退出登录 -->
    <van-cell class="message" title="消息通知" is-link />
    <van-cell class="intelligence" title="小智同学" is-link />
    <van-cell v-if="user" class="logout-btn" title="退出登录" clickable @click="onLogout" />


  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { Dialog, Toast } from 'vant'
import { getUserInfo } from '@/api/user'

const store = useStore()
const user = computed(() => store.state.user)
const userInfo = ref({})

//获取登录后的用户自己的个人信息
if (user) {
  // console.log(user)
  getUserInfo()
    .then(res => {
      userInfo.value = res.data.data
    })
    .catch(err => {
      Toast.fail('数据加载失败，请稍后再试')
    })
}

//退出登录按钮逻辑
function onLogout() {
  Dialog.confirm({
    title: '请确认是否退出',
  })
    .then(() => {
      // on confirm
      store.commit('setUser', null)
    })
    .catch(() => {
      // on cancel
      console.log('点击了取消')
    });

}

</script>

<style lang="less" scoped>
.profile {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .infomation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;

      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 3px solid #fff;
          margin-right: 22px;
        }

        .name {
          color: #fff;
          font-size: 30px;
        }
      }
    }

    .statistics {
      height: 130px;
      display: flex;

      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
          margin-bottom: 18px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {

    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      .toutiao-shoucang {
        color: #eb5253;
      }

      .toutiao-lishi {
        color: #ff9d1d;
      }

      .text {
        font-size: 28px;
      }
    }
  }

  .message,
  .logout-btn {
    margin-top: 9px;
  }

  .message,
  .intelligence,
  .logout-btn {
    font-size: 30px;
  }

  .logout-btn {
    text-align: center;
    color: #d86262;
  }
}
</style>