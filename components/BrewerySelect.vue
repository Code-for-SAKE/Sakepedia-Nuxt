<template>
  <div class="">
    <model-list-select
      :id="id"
      ref="brewery_search"
      v-model="innerValue"
      :name="innerName"
      :list="searchedBreweries"
      :option-value="optionValue"
      :option-text="optionText"
      :placeholder="placeholder"
      @input="onInput"
      @searchchange="searchBreweries"
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
      default: '',
    },
    name: {
      type: String,
      default: '',
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
      default: '酒蔵',
    },
    value: {
      type: [Object, String],
      default: () => {},
    },
  },
  data() {
    return {
      searchedBreweries: [],
      innerValue: this.value,
      innerName: this.name,
    };
  },
  mounted() {
    //初期値の設定
    if (this.value) {
      this.$axios
        .get('/api/breweries/' + this.value[this.optionValue])
        .then((response) => {
          this.searchedBreweries = [response.data];
          this.innerName = response.data[this.optionText];
        });
    } else {
      this.$axios.get('/api/breweries/').then((response) => {
        this.searchedBreweries = response.data.breweries;
      });
    }
  },
  methods: {
    onInput(item) {
      if (item) {
        console.log('onInput item', item);
        this.$emit('input', item);
      } else {
        console.log('onInput value', this.value);
        this.$emit('input', this.value);
      }
    },
    searchBreweries(searchText) {
      if (searchText) {
        console.log('searchBreweries searchText', searchText);
        this.$emit('input', { name: searchText });
        this.$axios
          .get('/api/list/breweries', { params: { keyword: searchText } })
          .then((response) => {
            this.searchedBreweries = response.data;
          });
      } else {
        this.innerValue = '';
        console.log('searchBreweries value', this.innerValue);
        this.$emit('input', this.innerValue);
      }
    },
  },
};
</script>
