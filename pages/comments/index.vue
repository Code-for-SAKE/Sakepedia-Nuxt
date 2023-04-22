<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1>投稿一覧</h1>
      <b-button variant="success" to="/comments/add">追加</b-button>
    </div>
    <hr />
    <div class="row">
      <div class="form-group col-md-4">
        <brewery-select ref="brewery_search" v-model="brewery" />
      </div>
      <div class="form-group col-md-4">
        <brand-select ref="brand_search" v-model="brand" />
      </div>
      <div class="form-group col-md-4">
        <sake-select ref="sake_search" v-model="sake" />
      </div>
      <div class="input-group col-12 mb-3">
        <input
          v-model="keyword"
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
    <image-list :list="comments" url-prefix="/comments/" />
  </div>
</template>

<script>
import { getList } from '../../lib/ApiClient/getList';
import BrewerySelect from '@/components/BrewerySelect.vue';
import BrandSelect from '@/components/BrandSelect.vue';
import SakeSelect from '@/components/SakeSelect.vue';
import ImageList from '@/components/ImageList';
export default {
  components: {
    BrewerySelect,
    BrandSelect,
    SakeSelect,
    ImageList,
  },
  async asyncData(context) {
    const keyword = context.query.keyword != null ? context.query.keyword : '';
    const brewery = context.query.brewery != null ? context.query.brewery : '';
    const brand = context.query.brand != null ? context.query.brand : '';
    const sake = context.query.sake != null ? context.query.sake : '';
    const limit = context.query.limit != null ? context.query.limit : 10;
    const page = context.query.page != null ? context.query.page : 1;
    const sortField = context.query.sortField != null ? context.query.sortField : 'createdAt';
    const sortOrder = context.query.sortOrder != null ? context.query.sortOrder : 'desc';
    const { list, currentPage, count } = await getList(
      'comments',
      {
        keyword: keyword,
        brewery: brewery,
        brand: brand,
        sake: sake,
        page: page,
        limit: limit,
        sortField: sortField,
        sortOrder: sortOrder,
      },
      context
    );
    return {
      keyword: keyword,
      brewery: brewery,
      brand: brand,
      sake: sake,
      comments: list,
      page: currentPage,
      count: count,
      sortField: sortField,
      sortOrder: sortOrder,
    };
  },
  data() {
    return {
      comments: [],
      keyword: '',
      sake: null,
      brand: null,
      brewery: null,
      page: 1,
      count: 0,
      limit: 10,
      sortField: 'createdAt',
      sortOrder: 'desc',
    };
  },
  mounted() {
    window.addEventListener('popstate', () => {
      this.keyword =
        this.$route.query.keyword != null ? this.$route.query.keyword : '';
      this.brewery =
        this.$route.query.brewery != null ? this.$route.query.brewery : '';
      this.brand =
        this.$route.query.brand != null ? this.$route.query.brand : '';
      this.sake = this.$route.query.sake != null ? this.$route.query.sake : '';
      this.limit =
        this.$route.query.limit != null ? this.$route.query.limit : 10;
      this.page = this.$route.query.page != null ? this.$route.query.page : 1;
      this.sortField = this.$route.query.sortField != null ? this.$route.query.sortField : 'createdAt';
      this.sortOrder = this.$route.query.sortOrder != null ? this.$route.query.sortOrder : 'desc';
      this.retrieves();
    });
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList('comments', {
        keyword: this.keyword,
        sake: this.sake,
        brand: this.brand,
        brewery: this.brewery,
        page: this.page,
        limit: this.limit,
        sortField: this.sortField,
        sortOrder: this.sortOrder,
      });
      this.comments = list;
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
      const queries = `?sortField=${this.sortField}&sortOrder=${this.sortOrder}&keyword=${this.keyword}&page=${this.page}&limit=${this.limit}&brewery=${this.brewery}&brand=${this.brand}&sake=${this.sake}`;
      window.history.pushState(null, null, `${url}${queries}`);
    },
  },
};
</script>
