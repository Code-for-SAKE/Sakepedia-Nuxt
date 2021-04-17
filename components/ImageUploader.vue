<template>
  <div>
    <p class="error" v-show="error">{{ error }}</p>
    <div class="m-6">
      <input
        type="file"
        class="input_image"
        accept="image/jpeg, image/png"
        @change="onImageChange"
      />
    </div>
  </div>
</template>

<script>

import FileEvaluable from '@/components/mixins/FileEvaluable'

export default {
  name: 'UserImageUploder',
  mixins: [ FileEvaluable ],
  props: {
    id: Number,
    currentImage: String,
  },
  model: {
    // このcurrentImageは親で指定した(v-model="avatar")と同値。
    prop: 'currentImage',
    event: 'change'
  },
  data () {
    return {
      message: '',
      error: ''
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    setImage (currentImage) {
      this.$emit('change', currentImage)
    },
    onImageChange (e) {
      const images = e.target.files || e.dataTransfer.files
      if (this.validation(images[0])) {
        this.getBase64(images[0])
          .then(image => this.setImage(image))
          .catch(error => this.setError(error, '画像のアップロードに失敗しました。'))
      } else {
      }
    },
    validation (file) {
      if (!this.isAllowFileType(file.type)) {
        this.error = this.getErrorMessageType()
        this.canBeUploaded = false
        return false
      }
      if (!this.isAllowFileSize(file.size)) {
        this.error = this.getErrorMessageSize()
        this.canBeUploaded = false
        return false
      }
      this.error = ''
      this.canBeUploaded = true
      return true
    }
  }
}
</script>

<style scoped>
.input_image {
/*  display: none;*/
}
</style>
