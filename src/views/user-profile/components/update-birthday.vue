<template>
  <div class="update-birthday">
    <van-datetime-picker
                         v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="UpdateBirthday" />
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs';

const props = defineProps({
  userBirthday: {
    type: String
  }
})

const emit = defineEmits(['close', 'update:user-birthday'])

const currentDate = ref(new Date(props.userBirthday))
const minDate = new Date(1900, 0, 1)
const maxDate = new Date()

async function UpdateBirthday() {
  Toast.loading({
    message: '更新生日中...',
    forbidClick: true,
  })
  try {
    const currentDateFormatted = ref(dayjs(currentDate.value).format('YYYY-MM-DD'))
    await updateUserProfile({
      birthday: currentDateFormatted.value
    })
    emit('close')
    emit('update:user-birthday', currentDateFormatted.value)
    Toast.success('更新生日成功')
  } catch (err) {
    Toast.fail('更新生日失败')
  }
}
</script>

<style lang="less" scoped>
</style>