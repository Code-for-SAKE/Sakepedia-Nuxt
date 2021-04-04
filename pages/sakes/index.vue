<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>日本酒一覧</h1>
      <b-button variant="success" to="/sakes/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchName" />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; search();"
          >検索</b-button>
        </div>
        <input type="text" class="form-control" v-model="searchTypes" />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; search();"
          >タグで検索</b-button>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="page"
      :total-rows="count*limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      @change="handlePageChange"
      align="center" />
    <hr>
    <div class="list-group"
      v-if="sakes.length">
      <nuxt-link
        class="list-group-item list-group-item-action"
        :to="'/sakes/' + sake._id"
        v-for="sake in sakes"
        :key="sake._id">
        {{ sake.name }}
      </nuxt-link>
    </div>

    <div class="alert alert-warning"
      v-else>
      データがありません
    </div>
  </div>
</template>

<script>
import SakeSelect from '@/components/SakeSelect.vue'
export default {
  components: {
    SakeSelect,
  },
  data() {
    return {

      sakes: [],
      searchValue: null,
      searchName: "",
      types: '',
      page: 1,
      count: 0,
      limit: 10,
      searchTypes: '',
      searchTypesQuery: []
    };
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/sakes')
    return {
      sakes : data.sakes,
      page : data.currentPage,
      count : data.pageCount
    }
  },
  mounted() {
    this.searchTypes = this.$route.query.type ?? '';
    this.search()
  },
  methods: {
    getRequestParams(searchName, page, limit, searchTypesQuery) {
      let params = {};
      if (searchName) {
        params["keyword"] = searchName;
      }
      if (page) {
        params["page"] = page;
      }
      if (limit) {
        params["limit"] = limit;
      }
      if (searchTypesQuery[0] !== '') {
        params["typeQuery"] = searchTypesQuery;
      }
      return {params: params};
    },

    retrieves () {
      const params = this.getRequestParams(
        this.searchName,
        this.page,
        this.limit,
        this.searchTypesQuery
      );

      this.$axios.get('/api/sakes', params)
      .then((response) => {
        this.sakes = response.data.sakes
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
    search () {
      this.searchTypesQuery = this.searchTypes.split(/[\s|　]+/);
      this.retrieves()
    },
  }
}
</script>
