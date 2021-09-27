<template>
  <div>
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
import { getList } from '@/lib/ApiClient/getList';
import ImageList from '@/components/ImageList';
export default {
  components: {
    ImageList,
  },
  props: {
    sake: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: '',
    },
    brewery: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      default: '',
    },
  },
  async asyncData(context) {
    const { list, currentPage, count } = await getList('comments', {}, context);
    return {
      comments: list,
      page: currentPage,
      count: count,
    };
  },
  data() {
    return {
      comments: [],
      keyword: '',
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
      const { list, currentPage, count } = await getList('comments', {
        keyword: this.keyword,
        sake: this.sake,
        brand: this.brand,
        brewery: this.brewery,
        userId: this.userId,
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
