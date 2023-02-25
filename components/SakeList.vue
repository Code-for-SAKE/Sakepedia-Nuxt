<template>
  <div>
    <b-pagination
      v-model="page"
      :total-rows="count * limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      align="center"
      @change="handlePageChange"
    />
    <div v-if="sakes.length" class="list-group">
      <nuxt-link
        v-for="sake in sakes"
        :key="sake._id"
        class="list-group-item list-group-item-action"
        :to="'/sakes/' + sake._id"
      >
        {{ sake.name }}
      </nuxt-link>
    </div>

    <div v-else class="alert alert-warning">データがありません</div>
  </div>
</template>

<script>
import { getList } from '../lib/ApiClient/getList';
export default {
  props: {
    search: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sakes: [],

      search_: this.search,

      page: 1,
      count: 0,
      limit: 10,
    };
  },
  created() {
    getList('sakes', { brand: this.search.brand }).then((res) => {
      this.sakes = res.list;
      this.page = res.currentPage;
      this.count = res.count;
    });
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList('sakes', {
        brand: this.search.brand,
        page: this.page,
        limit: this.limit,
      });
      this.sakes = list;
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
