<template>
  <div>
    <b-pagination
      v-if="bydatas.length >= 1"
      v-model="page"
      :total-rows="count * limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      align="center"
      @change="handlePageChange"
    />
    <div v-if="bydatas.length" class="list-group">
      <nuxt-link
        v-for="bydata in bydatas"
        :key="bydata._id"
        class="list-group-item list-group-item-action"
        :to="'/bydatas/' + bydata._id"
      >
        {{ bydata.sake ? bydata.sake.name : '' }}
        {{ bydata.makedBY }}
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
      bydatas: [],

      search_: this.search,

      page: 1,
      count: 0,
      limit: 3,
    };
  },
  mounted() {
    getList('bydatas', { sake: this.search.sake }).then((res) => {
      this.bydatas = res.list;
      this.page = res.currentPage;
      this.count = res.count;
    });
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList('bydatas', {
        page: this.page,
        limit: this.limit,
      });
      this.bydatas = list;
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
