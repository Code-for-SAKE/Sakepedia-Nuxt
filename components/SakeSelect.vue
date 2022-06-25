<template>
  <div class="">
    <model-list-select
      :id="id"
      ref="sake_search"
      v-model="innerValue"
      :name="innerName"
      :list="searchedSakes"
      :option-value="optionValue"
      :option-text="optionText"
      :placeholder="placeholder"
      @input="onInput"
      @searchchange="searchSakes"
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
      default: '日本酒',
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
      searchedSakes: [],
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
      this.$axios.get('/api/sakes/' + this.innerValue).then((response) => {
        this.searchedSakes = [response.data];
        this.innerName = response.data[this.optionText];
      });
    } else {
      this.$axios.get('/api/sakes/').then((response) => {
        this.searchedSakes = response.data.sakes;
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
        const item = this.searchedSakes.find((e) => {
          return e[this.optionValue] === option.value;
        });
        this.$emit('input', item);
      } else {
        this.$emit('input', option);
      }
    },
    searchSakes(searchText) {
      if (searchText != '') {
        // console.log('searchSakes searchText', searchText);
        // this.$emit('input', { name: searchText });
        this.$axios
          .get('/api/sakes', { params: { keyword: searchText } })
          .then((response) => {
            this.searchedSakes = response.data.sakes;
          });
      } else {
        this.$axios.get('/api/sakes/' + this.innerValue).then((response) => {
          this.searchedSakes = [response.data];
        });
      }
    },
  },
};
</script>
