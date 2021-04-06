<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>酒蔵一覧</h1>
      <b-button variant="success" to="/breweries/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchText" @keypress.enter='keyPressed'/>
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
      :total-rows="count*limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      @change="handlePageChange"
      align="center" />
    <hr>
    <div class="list-group"
      v-if="breweries.length">
      <nuxt-link
        class="list-group-item list-group-item-action"
        :to="'/breweries/' + brewery._id"
        v-for="brewery in breweries"
        :key="brewery._id">
        <span>{{ brewery.name }}</span>
        <span>{{prefectures[brewery.prefecture]}}</span>
      </nuxt-link>
    </div>
    <div class="alert alert-warning"
      v-else>
      データがありません
    </div>

  </div>
</template>

<script>
const Prefectures = require('../../utils/prefectures')
import BrewerySelect from '@/components/BrewerySelect.vue'
export default {
  components: {
    BrewerySelect,
  },
  data() {
    return {
      prefectures : Prefectures.prefectures,

      breweries: [],
      searchValue: null,
      searchText: "",

      page: 1,
      count: 0,
      limit: 10,

    };
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/breweries')
    return {
      breweries : data.breweries,
      count : data.pageCount,
      page : data.currentPage,
      pages : data.pages
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
      this.$axios.get('/api/breweries', params)
      .then((response) => {
        this.breweries = response.data.breweries
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
    keyPressed () {
      this.retrieves()
    }
  }
}
</script>
