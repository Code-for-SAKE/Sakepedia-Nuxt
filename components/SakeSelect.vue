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
      default: "日本酒",
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchedSakes: [],
      innerValue: this.value,
      innerName: this.name,
    };
  },
  mounted() {
    //初期値の設定
    if (this.value) {
      this.$axios
        .get("/api/sakes/" + this.value[this.optionValue])
        .then((response) => {
          this.searchedSakes = [response.data];
          this.innerName = response.data[this.optionText];
        });
    } else {
      this.$axios.get("/api/sakes/").then((response) => {
        this.searchedSakes = response.data.sakes;
      });
    }
  },
  methods: {
    onInput(item) {
      if (item) {
        console.log("onInput item", item);
        this.$emit("input", item);
      } else {
        console.log("onInput value", this.value);
        this.$emit("input", this.value);
      }
    },
    searchSakes(searchText) {
      if (searchText) {
        console.log("searchSakes searchText", searchText);
        this.$emit("input", { name: searchText });
        this.$axios
          .get("/api/list/sakes", { params: { keyword: searchText } })
          .then((response) => {
            this.searchedSakes = response.data;
          });
      } else {
        this.innerValue = "";
        console.log("searchSakes value", this.innerValue);
        this.$emit("input", this.innerValue);
      }
    },
  },
};
</script>
