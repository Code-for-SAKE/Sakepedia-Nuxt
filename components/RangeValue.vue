<template>
  <span v-if="!values">データなし</span>
  <span v-else-if="values.length >= 2 && values[1] && values[0]">
    {{ values[0] }} 〜 {{ values[1] }}</span
  >
  <span v-else-if="values.length >= 1 && values[0]">{{ values[0] }}</span>
  <span v-else>データなし</span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    values: {
      type: [Array, null],
      required: true,
      default: () => null,
    },
  },
});
</script>
