<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>日本酒醸造データ一覧</h1>
      <b-button variant="success" to="/bydatas/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchText" />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; retrieves();"
          >検索</b-button>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="page"
      :total-rows="count"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      @change="handlePageChange"
      align="center" />
    <hr>
    <div class="list-group"
      v-if="bydatas.length">
      <nuxt-link
        class="list-group-item list-group-item-action"
        :to="'/bydatas/' + bydata._id"
        v-for="bydata in bydatas"
        :key="bydata._id">
        {{ bydata.sake ? bydata.sake.name : '' }}
        {{ bydata.makedBY }}
      </nuxt-link>
    </div>

    <div class="alert alert-warning"
      v-else>
      データがありません
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {

      bydatas: [],
      searchValue: null,
      searchText: "",

      page: 1,
      count: 0,
      limit: 10,

    };
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/bydatas')
    return {
      bydatas : data.bydatas,
      page : data.currentPage,
      count : data.pageCount
    }
  },
  methods: {
    getRequestParams(searchText, page, limit) {
      let params = {};
      if (searchText) {
        params["keyword"] = searchText;
      }
      if (page) {
        params["page"] = page;
      }
      if (limit) {
        params["limit"] = limit;
      }
      return {params: params};
    },

    retrieves() {
      let search = this.searchText
      const params = this.getRequestParams(
        search,
        this.page,
        this.limit
      );

      this.$axios.get('/api/bydatas', params)
      .then((response) => {
        this.bydatas = response.data.bydatas
        this.page = response.data.currentPage
        this.count = response.data.pageCount
      })
      .catch((e) => {
        console.log(e);
      });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieves();
    },
  }
}
</script>
