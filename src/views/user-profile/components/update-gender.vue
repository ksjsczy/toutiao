<template>
  <div class="update-gender">
    <van-picker
                title="标题"
                :columns="columns"
                @confirm="updateGender"
                @cancel="$emit('close')"
                @change="onChange"
                :default-index="userGender" />
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import { updateUserProfile } from '@/api/user'

const emit = defineEmits(['close', 'update:user-gender'])
const props = defineProps({
  userGender: {
    type: Number,
  }
})

const localGender = ref(props.userGender)
const columns = ['男', '女'];

async function updateGender() {
  Toast.loading({
    message: '更新性别中...',
    forbidClick: true,
  })
  try {
    await updateUserProfile({
      gender: localGender.value
    })
    emit('close')
    emit('update:user-gender', localGender.value)
    Toast.success('更新性别成功')
  } catch (err) {
    Toast.fail('更新性别失败')
  }
}

function onChange(value, index) {
  localGender.value = index
}
</script>

<style lang="less" scoped>
</style>