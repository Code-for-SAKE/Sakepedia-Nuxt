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
import { ModelListSelect } from "vue-search-select";
export default {
  components: {
    ModelListSelect,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    optionValue: {
      type: String,
      default: "_id",
    },
    optionText: {
      type: String,
      default: "name",
    },
    placeholder: {
      type: String,
      default: "銘柄",
    },
    value: {
      type: [Object, String],
      default: () => {},
    },
  },
  data() {
    return {
      searchedBrands: [],
      innerValue: this.value,
      innerName: this.name,
    };
  },
  mounted() {
    //初期値の設定
    if (this.value) {
      this.$axios
        .get("/api/brands/" + this.value[this.optionValue])
        .then((response) => {
          this.searchedBrands = [response.data];
          this.innerName = response.data[this.optionText];
        });
    } else {
      this.$axios.get("/api/brands/").then((response) => {
        this.searchedBrands = response.data.brands;
      });
    }
  },
  methods: {
    onInput(item) {
      if (item) {
        this.$emit("input", item);
      } else {
        this.$emit("input", this.value);
      }
    },
    searchBrands(searchText) {
      if (searchText) {
        this.$emit("input", { name: searchText });
        this.$axios
          .get("/api/list/brands", { params: { keyword: searchText } })
          .then((response) => {
            this.searchedBrands = response.data;
          });
      } else {
        this.innerValue = "";
        this.$emit("input", this.innerValue);
      }
    },
  },
};
</script>
