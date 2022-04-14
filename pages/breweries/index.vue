<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>酒蔵一覧</h1>
      <b-button variant="success" to="/breweries/add">追加</b-button>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">都道府県</span>
          </div>
          <select v-model="prefecture" class="custom-select">
            <option
              v-for="(item, index) in prefectures"
              :key="index"
              :value="index"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input
            v-model="searchText"
            type="text"
            class="form-control"
            @keypress.enter="
              page = 1;
              setHistories();
              retrieves();
            "
          />
          <div class="input-group-append">
            <b-button
              variant="secondary"
              type="button"
              @click="
                page = 1;
                setHistories();
                retrieves();
              "
              >検索</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="page"
      :total-rows="count * limit"
      :per-page="limit"
      prev-text="Prev"
      next-text="Next"
      align="center"
      @change="handlePageChange"
    />
    <hr />
    <div v-if="breweries.length" class="list-group">
      <nuxt-link
        v-for="brewery in breweries"
        :key="brewery._id"
        class="list-group-item list-group-item-action"
        :to="'/breweries/' + brewery._id"
      >
        <span>{{ brewery.name }}</span>
        <span>{{ prefectures[brewery.prefecture] }}</span>
      </nuxt-link>
    </div>
    <div v-else class="alert alert-warning">データがありません</div>
  </div>
</template>

<script>
const Prefectures = require('../../utils/prefectures');
import { getList } from '../../lib/ApiClient/getList';
export default {
  components: {},
  async asyncData(context) {
    const searchText = context.query.name != null ? context.query.name : '';
    const prefecture =
      context.query.prefecture != null ? context.query.prefecture : '';
    const limit = context.query.limit != null ? context.query.limit : 10;
    const page = context.query.page != null ? context.query.page : 1;
    const searchTypes = context.query.type != null ? context.query.type : '';
    const typeQuery = searchTypes.split(/[\s|　]+/);
    const { list, currentPage, count } = await getList(
      'breweries',
      {
        searchName: searchText,
        prefecture: prefecture,
        page: page,
        limit: limit,
        ...(typeQuery[0] === '' ? {} : { typeQuery: typeQuery }),
      },
      context
    );
    return {
      searchText: searchText,
      prefecture: prefecture,
      searchTypes: searchTypes,
      breweries: list,
      page: currentPage,
      count: count,
    };
  },
  data() {
    return {
      prefectures: Prefectures.prefectures,

      breweries: [],
      searchValue: null,
      searchText: '',
      prefecture: '',

      page: 1,
      count: 0,
      limit: 10,
    };
  },
  mounted() {
    window.addEventListener('popstate', () => {
      this.searchText =
        this.$route.query.name != null ? this.$route.query.name : '';
      this.limit =
        this.$route.query.limit != null ? this.$route.query.limit : 10;
      this.page = this.$route.query.page != null ? this.$route.query.page : 1;
      this.searchTypes =
        this.$route.query.type != null ? this.$route.query.type : '';
      this.retrieves();
    });
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList('breweries', {
        searchName: this.searchText,
        prefecture: this.prefecture,
        page: this.page,
        limit: this.limit,
      });
      this.breweries = list;
      this.page = currentPage;
      this.count = count;
    },
    handlePageChange(value) {
      this.page = value;
      this.setHistories();
      this.retrieves();
    },
    setHistories() {
      const url = window.location.href.replace(/\?.*$/, '');
      const queries = `?name=${this.searchText}&prefecture=${this.prefecture}&type=${this.searchTypes}&page=${this.page}&limit=${this.limit}`;
      window.history.pushState(null, null, `${url}${queries}`);
    },
  },
};
</script>
