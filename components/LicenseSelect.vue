<template>
  <div>
    <basic-select
      :options="options"
      :selected-option="options.find((license) => license.value === value)"
      :name="name"
      :value="value"
      placeholder="オープンなライセンスを選択してください"
      @select="onInput"
    />
    <p v-if="value !== null" class="alert alert-info m-2">
      画像下に以下が表示されます。
    </p>
    <license-view :value="value" class="m-2" />
  </div>
</template>

<script>
import { BasicSelect } from 'vue-search-select';
import LicenseView from '@/components/LicenseView.vue';
export default {
  components: {
    BasicSelect,
    LicenseView,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      options: [
        { text: '', value: null },
        { text: 'CCO 権利放棄', value: 'CC0' },
        { text: 'PD 著作者人格権のみ', value: 'PD' },
        { text: 'CC BY 表示', value: 'CC-BY' },
      ],
    };
  },
  methods: {
    onInput(item) {
      console.log('LICENSE ' + item.value);
      this.$emit('input', item.value);
    },
  },
};
</script>
