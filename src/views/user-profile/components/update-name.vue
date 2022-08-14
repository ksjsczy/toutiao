<template>
  <div class="update-name">
    <van-nav-bar
                 title="设置昵称"
                 left-text="取消"
                 right-text="完成"
                 @click-left="$emit('close')"
                 @click-right="updateName">
    </van-nav-bar>
    <div class="field-wrap">
      <van-field
                 v-model.trim="localName"
                 placeholder="请输入昵称"
                 maxlength="7"
                 show-word-limit
                 type="textarea"
                 rows="1"
                 autosize>
      </van-field>
    </div>
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import { updateUserProfile } from '@/api/user'

const emit = defineEmits(['close', 'update:user-name'])
const props = defineProps({
  userName: {
    type: String,
  }
})

const localName = ref(props.userName)

async function updateName() {
  if (localName.value <= 0) {
    Toast.fail('昵称不能为空')
    return
  }
  Toast.loading({
    message: '更新昵称中...',
    forbidClick: true,
  })
  try {
    await updateUserProfile({
      name: localName.value
    })
    emit('update:user-name', localName.value)
    emit('close')
    Toast.success('更新昵称成功')
  } catch (err) {
    Toast.fail('更新昵称失败')
  }
}
</script>

<style lang="less" scoped>
.update-name {
  /deep/.van-nav-bar {
    background-color: #fff;

    .van-nav-bar__title {
      color: #000;
    }
  }

  .field-wrap {
    padding: 20px;
  }
}
</style>