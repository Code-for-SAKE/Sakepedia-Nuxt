<template>
  <div class="">
    <model-list-select
      :id="id"
      ref="brand_search"
      v-model="innerValue"
      :name="innerName"
      :list="searchedBrands"
      :option-value="optionValue"
      :option-text="optionText"
      :placeholder="placeholder"
      @input="onInput"
      @searchchange="searchBrands"
    >
    </model-list-select>
  </div>
</template>

<script>
import { ModelListSelect } from 'vue-search-select';
export default {
  components: {
    ModelListSelect,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    optionValue: {
      type: String,
      default: '_id',
    },
    optionText: {
      type: String,
      default: 'name',
    },
    placeholder: {
      type: String,
      default: '銘柄',
    },
    value: {
      // type: [Object, String],
      // default: () => {},
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchedBrands: [],
      // innerValue: this.value, //computedに変更
      innerName: this.name,
    };
  },
  // computedとすることにより、propsで受け取る、値を変えることが可能になる
  computed: {
    innerValue: {
      get() {
        if (this.value == null) {
          return '';
        } else {
          if (typeof this.value === 'object') {
            return this.value._id;
          } else {
            return this.value;
          }
        }
      },
      set(newVal) {
        console.log('innerValue set', newVal);
        this.$emit('input', newVal); // ここでinput は必要
      },
    },
  },
  mounted() {
    //初期値の設定
    if (this.innerValue != '') {
      this.$axios
        // .get('/api/brands/' + this.value[this.optionValue])
        .get('/api/brands/' + this.innerValue)
        .then((response) => {
          this.searchedBrands = [response.data];
          this.innerName = response.data[this.optionText];
        });
    } else {
      this.$axios.get('/api/brands/').then((response) => {
        this.searchedBrands = response.data.brands;
      });
    }
  },
  methods: {
    // https://github.com/moreta/vue-search-select/blob/master/src/lib/ModelListSelect.vue から移植
    onInput(option) {
      console.log('onInput', option);
      if (option === undefined) {
        return this.$emit('input', '');
      }
      if (Object.keys(option).length === 0 && option.constructor === Object) {
        this.$emit('input', option);
      } else if (typeof option === 'object') {
        const item = this.searchedBrands.find((e) => {
          return e[this.optionValue] === option.value;
        });
        this.$emit('input', item);
      } else {
        this.$emit('input', option);
      }
    },
    searchBrands(searchText) {
      if (searchText != '') {
        // this.$emit('input', { name: searchText });
        this.$axios
          .get('/api/brands', { params: { keyword: searchText } })
          .then((response) => {
            this.searchedBrands = response.data.brands;
          });
      } else {
        this.$axios.get('/api/brands/' + this.innerValue).then((response) => {
          this.searchedBrands = [response.data];
        });
      }
    },
  },
};
</script>
