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
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    optionList: {
      type: Array,
      default: () => {
        return ['イカの塩辛', '大根のおでん', 'もつ煮込み'];
      },
    },
    value: {
      type: String,
      default: null,
    },
  },
  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(newVal) {
        if (this.value !== newVal) this.$emit('input', newVal);
      },
    },
  },
};
</script>
