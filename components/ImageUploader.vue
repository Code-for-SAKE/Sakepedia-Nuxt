<template>
  <div>
    <p v-show="error" class="error">{{ error }}</p>
    <b-form-file
      v-model="file"
      accept="image/jpeg, image/png"
      placeholder="ファイルを選択するかドロップする"
      drop-placeholder="ここにドロップ..."
      @change="onImageChange"
    ></b-form-file>
  </div>
</template>

<script>
import FileEvaluable from "@/components/mixins/FileEvaluable";

export default {
  name: "UserImageUploder",
  mixins: [FileEvaluable],
  model: {
    // このcurrentImageは親で指定した(v-model="avatar")と同値。
    prop: "currentImage",
    event: "change",
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    currentImage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      file: null,
      message: "",
      error: "",
    };
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    makeImage(image, resizeWidth, resizeHeight) {
      //高さと幅どちらもオーバーしていなければそのままにする
      if (image.width < resizeWidth && image.height < resizeHeight) {
        return image.src;
      }
      //オーバーしている場合はリサイズ

      // canvas要素を作成
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 縦横比を算出
      const ratio = image.height / image.width;

      // 生成する画像の横幅
      const width = ratio < 1 ? resizeWidth : resizeHeight / ratio;
      // 生成する画像の高さ
      const height = ratio > 1 ? resizeHeight : resizeWidth * ratio;
      canvas.width = width;
      canvas.height = height;

      // canvas描画作成
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        width,
        height
      );

      // data_url形式に変換したものを返す
      return canvas.toDataURL("image/jpeg");
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const image = new Image();
        const vm = this;

        reader.readAsDataURL(file);
        reader.onload = (e) => {
          image.src = e.target.result;
          image.onload = () => {
            resolve(vm.makeImage(image, 1280, 1280));
          };
        };
        reader.onerror = (error) => reject(error);
      });
    },
    setImage(currentImage) {
      this.$emit("change", currentImage);
    },
    onImageChange(e) {
      const images = e.target.files || e.dataTransfer.files;
      if (this.validation(images[0])) {
        this.getBase64(images[0])
          .then((image) => this.setImage(image))
          .catch((error) =>
            this.setError(error, "画像のアップロードに失敗しました。")
          );
      } else {
      }
    },
    validation(file) {
      if (!this.isAllowFileType(file.type)) {
        this.error = this.getErrorMessageType();
        this.canBeUploaded = false;
        return false;
      }
      if (!this.isAllowFileSize(file.size)) {
        this.error = this.getErrorMessageSize();
        this.canBeUploaded = false;
        return false;
      }
      this.error = "";
      this.canBeUploaded = true;
      return true;
    },
  },
};
</script>

<style>
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: "...";
}
</style>
