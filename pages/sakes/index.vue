<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>日本酒一覧</h1>
      <b-button variant="success" to="/sakes/add">追加</b-button>
    </div>
    <hr>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchName" @keypress.enter='page=1; retrieves();'/>
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; retrieves();"
          >検索</b-button>
        </div>
        <input type="text" class="form-control" v-model="searchTypes" @keypress.enter='page=1; retrieves();'/>
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="page = 1; retrieves();"
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
import { getList } from '../../lib/ApiClient/getList'
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
      typeQuery: []
    };
  },
  async asyncData(context){
    const { list, currentPage, count } = await getList('sakes', {}, context)
    return {
      sakes : list,
      page : currentPage,
      count : count
    }
  },
  mounted() {
    this.searchTypes = this.$route.query.type ?? '';
    this.retrieves()
  },
  methods: {
    async retrieves () {
      this.typeQuery = this.searchTypes.split(/[\s|　]+/);
      const { list, currentPage, count } = await getList('sakes', {
        searchName: this.searchName,
        page: this.page,
        limit: this.limit,
        ...(this.typeQuery[0] === '' ? {} : {typeQuery: this.typeQuery})
      })
      this.sakes = list
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
