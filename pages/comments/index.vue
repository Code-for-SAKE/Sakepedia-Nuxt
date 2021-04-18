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
            retrieves();
          "
        />
        <div class="input-group-append">
          <b-button
            variant="secondary"
            type="button"
            @click="
              page = 1;
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
import { getList } from "../../lib/ApiClient/getList";
import BrewerySelect from "@/components/BrewerySelect.vue";
import BrandSelect from "@/components/BrandSelect.vue";
import SakeSelect from "@/components/SakeSelect.vue";
import ImageList from "@/components/ImageList";
export default {
  components: {
    BrewerySelect,
    BrandSelect,
    SakeSelect,
    ImageList,
  },
  async asyncData(context) {
    const { list, currentPage, count } = await getList("comments", {}, context);
    return {
      comments: list,
      page: currentPage,
      count: count,
    };
  },
  data() {
    return {
      comments: [],
      keyword: "",
      sake: null,
      brand: null,
      brewery: null,
      page: 1,
      count: 0,
      limit: 10,
    };
  },
  mounted() {
    this.retrieves();
  },
  methods: {
    async retrieves() {
      const { list, currentPage, count } = await getList("comments", {
        keyword: this.keyword,
        sake: this.sake,
        brand: this.brand,
        brewery: this.brewery,
        page: this.page,
        limit: this.limit,
      });
      this.comments = list;
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
