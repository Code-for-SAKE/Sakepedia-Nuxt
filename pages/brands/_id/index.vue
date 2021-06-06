<template>
  <div>
    <h1>銘柄 詳細</h1>

    <hr />

    <h2>{{ brand.name }}</h2>
    <h6>By {{ author }}</h6>

    <dl>
      <dt>酒蔵</dt>
      <dd>
        <nuxt-link v-if="brand.brewery" :to="'/breweries/' + brand.brewery._id">
          {{ brand.brewery.name }}
        </nuxt-link>
      </dd>
      <dt>ロゴ</dt>
      <dd>{{ brand.logo }}</dd>
      <dt>こだわり</dt>
      <dd>{{ brand.description }}</dd>
    </dl>

    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <b-button
          variant="light"
          :to="'/brands/' + brand._id + '/update'"
          class="mr-3"
          >編集</b-button
        >
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button to="/brands">一覧に戻る</b-button>
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>日本酒</h3>
        <b-button variant="success" :to="'/sakes/add?brand=' + brand._id"
          >日本酒追加</b-button
        >
      </div>
      <sake-list :search="search" class="m-3" />
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>投稿一覧</h3>
        <div class="d-flex justify-content-between">
          <div></div>
          <b-button variant="success" :to="'/comments/add?brand=' + brand._id"
            >投稿追加</b-button
          >
        </div>
      </div>
      <comment-list :brand="brand._id" />
    </div>
  </div>
</template>

<script>
import SakeList from '@/components/SakeList.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  components: {
    SakeList,
    CommentList,
  },
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/brands/' + context.route.params.id
    );
    const author = data.author;
    if (author) {
      return {
        brand: data,
        author: author,
      };
    } else {
      const userId = data.userId;
      if (userId) {
        const response = await context.$axios.get(`/api/users/${userId}/name`);
        return {
          brand: data,
          author: response.data.name,
        };
      } else {
        return {
          brand: data,
          author: '',
        };
      }
    }
  },
  data() {
    return {
      search: {
        brand: this.$route.params.id,
      },
      author: '',
    };
  },

  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/brands/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({ name: 'brands', params: { deleted: 'yes' } });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
