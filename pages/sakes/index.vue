<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>日本酒一覧</h1>
      <b-button variant="success" to="/sakes/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchText" />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; searchByName();"
          >検索</b-button>
        </div>
        <input type="text" class="form-controll" v-model="types" />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; searchByTypes();"
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
      searchText: "",
      types: '',
      typeQuery: [],
      page: 1,
      count: 0,
      limit: 10,

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
  methods: {
    getRequestParams(searchText, page, limit, typeQuery) {
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
      if (typeQuery) {
        params["typeQuery"] = typeQuery;
      }
      return {params: params};
    },

    retrieves(name='', types=[]) {
      let search = name
      const typeQuery = types
      const params = this.getRequestParams(
        search,
        this.page,
        this.limit,
        typeQuery
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
    searchByName () {
      const name = this.searchText;
      this.retrieves(name,[])
    },
    searchByTypes () {
      const typeQuery = this.types.split(/[\s|　]+/);
      this.retrieves('',typeQuery);
    }
  }
}
</script>
