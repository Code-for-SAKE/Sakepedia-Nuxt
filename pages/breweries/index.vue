<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>酒蔵一覧</h1>
      <b-button variant="success" to="/breweries/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchText" @keypress.enter='retrieves'/>
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
import { getList } from '../../lib/ApiClient/getList'
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
    const { list, currentPage, count } = await getList('breweries', {}, context)
    return {
      breweries : list,
      page : currentPage,
      count : count
    }
  },
  methods: {
    async retrieves () {
      const { list, currentPage, count } = await getList('breweries', {
        searchName: this.searchText,
        page: this.page,
        limit: this.limit,
      })
      this.breweries = list
      this.page = currentPage
      this.count = count
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieves();
    }
  }
}
</script>
