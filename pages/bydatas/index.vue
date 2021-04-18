<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>日本酒醸造データ一覧</h1>
      <b-button variant="success" to="/bydatas/add">追加</b-button>
    </div>
    <hr />
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
import { getList } from '../../lib/ApiClient/getList';
export default {
  components: {},
  async asyncData(context) {
    const searchText = context.query.name != null ? context.query.name : '';
    const limit = context.query.limit != null ? context.query.limit : 10;
    const page = context.query.page != null ? context.query.page : 1;
    const searchTypes = context.query.type != null ? context.query.type : '';
    const typeQuery = searchTypes.split(/[\s|　]+/);
    const { list, currentPage, count } = await getList(
      'bydatas',
      {
        searchName: searchText,
        page: page,
        limit: limit,
        ...(typeQuery[0] === '' ? {} : { typeQuery: typeQuery }),
      },
      context
    );
    return {
      searchText: searchText,
      searchTypes: searchTypes,
      bydatas: list,
      page: currentPage,
      count: count,
    };
  },
  data() {
    return {
      bydatas: [],
      searchValue: null,
      searchText: '',

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
      const { list, currentPage, count } = await getList('bydatas', {
        searchName: this.searchText,
        page: this.page,
        limit: this.limit,
      });
      this.bydatas = list;
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
      const queries = `?name=${this.searchText}&type=${this.searchTypes}&page=${this.page}&limit=${this.limit}`;
      window.history.pushState(null, null, `${url}${queries}`);
    },
  },
};
</script>
