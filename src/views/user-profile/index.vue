<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />

    <!-- 头像、昵称、性别、生日 -->
    <van-cell class="avatar-cell" title="头像" is-link @click="avatarRef.click()">
      <template #value>
        <van-image
                   class="avatar"
                   fit="cover"
                   round
                   :src="user.photo" />
      </template>
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow = true" />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow = true" />
    <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow = true" />

    <!-- 编辑头像 -->
    <input type="file" hidden ref="avatarRef" @change="onFileChange">
    <van-popup
               v-model:show="isUpdateAvatarShow"
               position="bottom"
               style="height: 100%;">
      <update-avatar
                     v-if="isUpdateAvatarShow"
                     :img-data="imgData"
                     @close="isUpdateAvatarShow = false"
                     @update:avatar="user.photo = $event">
      </update-avatar>
    </van-popup>

    <!-- 编辑昵称 -->
    <van-popup
               v-model:show="isUpdateNameShow"
               position="bottom"
               style="height: 100%;">
      <update-name
                   v-if="isUpdateNameShow"
                   v-model:user-name="user.name"
                   @close="isUpdateNameShow = false">
      </update-name>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup
               v-model:show="isUpdateGenderShow"
               position="bottom">
      <update-gender
                     v-if="isUpdateGenderShow"
                     v-model:user-gender="user.gender"
                     @close="isUpdateGenderShow = false">
      </update-gender>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup
               v-model:show="isUpdateBirthdayShow"
               position="bottom">
      <update-birthday
                       v-if="isUpdateBirthdayShow"
                       v-model:user-birthday="user.birthday"
                       @close="isUpdateBirthdayShow = false">
      </update-birthday>
    </van-popup>
  </div>
</template>

<script setup>
import { getUserProfile } from '@/api/user'
import { Toast } from 'vant';
import UpdateName from './components/update-name.vue';
import UpdateGender from './components/update-gender.vue';
import UpdateBirthday from './components/update-birthday.vue';
import UpdateAvatar from './components/update-avatar.vue';

const user = ref({})
const avatarRef = ref(null)
const isUpdateAvatarShow = ref(false)
const imgData = ref(null)
const isUpdateNameShow = ref(false)
const isUpdateGenderShow = ref(false)
const isUpdateBirthdayShow = ref(false)

getUserProfile()
  .then(res => {
    console.log(res)
    user.value = res.data.data
  })
  .catch(err => Toast.fail('获取个人资料失败'))

function onFileChange() {
  //获取文件对象
  const file = avatarRef.value.files[0]

  //基于文件对象获取blob数据
  const binaryData = [file]
  imgData.value = window.URL.createObjectURL(new Blob(binaryData))
  isUpdateAvatarShow.value = true
  avatarRef.value.value = ''
}
</script>

<style lang="less" scoped>
.user-profile {

  /deep/.avatar-cell {
    .van-cell__title {
      display: flex;
      align-items: center;
    }

    .van-cell__value {
      display: flex;
      justify-content: end;
      align-items: center;

      .avatar {
        width: 60px;
        height: 60px;
      }
    }

    .van-cell__right-icon {
      display: flex;
      align-items: center;
      height: 60px;
    }
  }

  /deep/.van-popup {
    background-color: #f5f7f9;
  }
}
</style>