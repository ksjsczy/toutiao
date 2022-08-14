<template>
  <div class="update-avatar">
    <img ref="imageRef" class="avatar" :src="imgData">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确认</div>
    </div>
  </div>
</template>

<script setup>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updateUserAvatar } from '@/api/user'
import { Toast } from 'vant';

const props = defineProps({
  imgData: {
    type: [String, Object],
    required: true
  }
})
const emit = defineEmits(['close', 'update:avatar'])

const imageRef = ref(null)
const cropper = ref(null)

onMounted(() => {
  cropper.value = new Cropper(imageRef.value, {
    viewMode: 1,
    dragMode: 'move',
    aspectRatio: 1,
    autoCropArea: 1,
    cropBoxMovable: false,
    cropBoxResizable: false,
    background: false,
    movable: true
  })
})

function onConfirm() {
  cropper.value.getCroppedCanvas().toBlob(blob => {
    // console.log(blob)
    updateAvatar(blob)
  })
}

async function updateAvatar(blob) {
  Toast.loading({
    message: '更新头像中...',
    forbidClick: true,
  })
  try {
    const formData = new FormData()
    formData.append('photo', blob)
    const { data } = await updateUserAvatar(formData)
    // console.log(data)
    emit('close')
    emit('update:avatar', data.data.photo)
    Toast.success('上传头像成功')
  } catch (err) {
    Toast.fail('上传头像失败')
  }
}
</script>

<style lang="less" scoped>
.update-avatar {
  background-color: #000;
  height: 100%;

  .avatar {
    max-width: 100%;
    display: block;
  }

  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      padding: 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>