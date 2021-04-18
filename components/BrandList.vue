<template>
  <div>
    <b-pagination
      v-if="brands.length > 2"
      v-model="page"
      :total-rows="count * limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      align="center"
      @change="handlePageChange"
    />
    <div v-if="brands.length" class="list-group">
      <nuxt-link
        v-for="brand in brands"
        :key="brand._id"
        class="list-group-item list-group-item-action"
        :to="'/brands/' + brand._id"
      >
        {{ brand.name }}
      </nuxt-link>
    </div>

    <div v-else class="alert alert-warning">データがありません</div>
  </div>
</template>

<script>
import { getList } from "../lib/ApiClient/getList";
export default {
  props: {
    search: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      brands: [],

      search_: this.search,

      page: 1,
      count: 0,
      limit: 10,
    };
  },
  created() {
    getList("brands", { brewery: this.search.brewery }).then((res) => {
      this.brands = res.list;
      this.page = res.currentPage;
      this.count = res.count;
    });
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList("brands", {
        page: this.page,
        limit: this.limit,
      });
      this.brands = list;
      this.page = currentPage;
      this.count = count;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieves();
    },
  },
};
</script>
