<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar
                 title="登录"
                 left-arrow
                 @click="$router.back()" />

    <!-- 登录表单 -->
    <van-form
              @submit="onSubmit"
              validate-trigger="onSubmit"
              ref="loginFormRef">
      <van-cell-group inset>
        <!-- 手机号输入框 -->
        <van-field
                   name="mobile"
                   placeholder="请输入手机号"
                   v-model="user.mobile"
                   :rules="userFormRules.mobile"
                   type="number"
                   maxlength="11">
          <template #left-icon>
            <i class="toutiao toutiao-shouji"></i>
          </template>
        </van-field>
        <!-- 验证码输入框 -->
        <van-field
                   name="code"
                   placeholder="请输入验证码"
                   v-model="user.code"
                   :rules="userFormRules.code"
                   type="number"
                   maxlength="6">
          <template #left-icon>
            <i class="toutiao toutiao-yanzhengma"></i>
          </template>
          <template #button>
            <van-count-down
                            v-if="isCountDownShow"
                            :time="10 * 1000"
                            format="ss 秒"
                            @finish="changeCountDownStatus" />
            <van-button
                        v-else
                        class="toutiao-btn"
                        round
                        size="small"
                        type="primary"
                        @click="onSendSms">获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button
                    class="login-btn"
                    block
                    type="primary"
                    native-type="submit"
                    center>
          登陆
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script setup>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant';
import { useStore } from 'vuex';
import userFormRules from './rules'

const store = useStore()
const router = useRouter()

//表单内容
const user = ref({
  mobile: '13911111111',
  code: '246810'
})

//获取登录的表单实例
const loginFormRef = ref(null)

//切换展示'获取验证码'和'倒计时'
const isCountDownShow = ref(false)

//模拟验证码获取间隔的限制
const isSendSms = ref(true)

//点击登录
async function onSubmit() {
  //1.表单验证

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  //2.提交表单请求登录
  try {
    const { data } = await login(user.value)
    store.commit('setUser', data.data)
    Toast.success('登录成功');
    //登录后跳转页面
    router.back()
  } catch (err) {
    if (err.response.status === 400) {
      Toast.fail('手机号或验证码错误');
    } else {
      Toast.fail('登录失败，请稍后再试');
    }
  }
}

//点击发送验证码
async function onSendSms() {
  if (!isSendSms.value) {
    Toast('验证码发送过于频繁，请稍后再试')
    return
  }
  //1.校验手机号
  try {
    await loginFormRef.value.validate('mobile')
    console.log('校验成功')
  } catch (err) {
    console.log('校验失败', err)
    return
  }

  //2.验证通过，显示倒计时
  changeCountDownStatus()

  //3.模拟请求发送验证码(没有相应接口)
  sendSms(user.value.mobile)
  Toast('验证码发送成功')
  isSendSms.value = !isSendSms.value
  setTimeout(() => {
    isSendSms.value = !isSendSms.value
  }, 20 * 1000);

}

//切换倒计时展示的状态
function changeCountDownStatus() {
  isCountDownShow.value = !isCountDownShow.value
}
</script>

<style lang="less" scoped>
.login {
  .van-cell-group--inset {
    margin: 0;
  }

  .toutiao {
    font-size: 37px;
  }


  .login-btn-wrap {
    padding: 53px 28px 0;
    border-radius: 10px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>