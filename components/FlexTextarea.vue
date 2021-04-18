<template>
  <div class="FlexTextarea">
    <div class="FlexTextarea__dummy" aria-hidden="true"></div>
    <textarea
      :id="id"
      class="FlexTextarea__textarea"
      :class="innerClass"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  name: "FlexTextarea",
  props: {
    id: {
      type: String,
      default: "",
    },
    innerClass: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  mounted: function () {
    this.flexTextarea(this.$el);
  },
  methods: {
    flexTextarea(el) {
      const dummy = el.querySelector(".FlexTextarea__dummy");
      const textarea = el.querySelector(".FlexTextarea__textarea");
      textarea.addEventListener("input", (e) => {
        dummy.textContent = e.target.value + "\u200b";
      });
      dummy.textContent = textarea.value + "\u200b";
    },
  },
};
</script>

<style scoped>
.FlexTextarea {
  position: relative;
  font-size: 1rem;
  line-height: 1.8;
}

.FlexTextarea__dummy {
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  padding: 5px 15px;
  min-height: 120px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border: 1px solid;
}

.FlexTextarea__textarea {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 5px 15px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid #b6c3c6;
  border-radius: 4px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  resize: none;
}

.FlexTextarea__textarea:focus {
  box-shadow: 0 0 0 4px rgba(35, 167, 195, 0.3);
  outline: 0;
}
</style>
