<template>
  <v-select
    v-model="internalValue"
    :options="optionList"
    taggable
    multiple
  ></v-select>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    optionList: {
      type: Array,
      default: () => {
        return [
          "純米",
          "吟醸",
          "大吟醸",
          "火入れ",
          "生酒",
          "しぼりたて",
          "おりがらみ",
          "にごり酒",
          "生酛",
          "山廃",
          "貴譲酒",
          "古酒",
        ];
      },
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        if (this.value !== newVal) this.$emit("input", newVal);
      },
    },
  },
};
</script>
