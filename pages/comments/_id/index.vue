<template>
  <div>
    <h1>投稿 詳細</h1>

    <hr />
    <b-img-lazy
      v-show="comment.image"
      :src="comment.image"
      class="show_image"
    />
    <dl>
      <dt>酒蔵</dt>
      <dd>
        <nuxt-link
          v-if="comment.brewery"
          :to="'/breweries/' + comment.brewery._id"
        >
          {{ comment.brewery.name }}
        </nuxt-link>
      </dd>
      <dt>銘柄</dt>
      <dd>
        <nuxt-link v-if="comment.brand" :to="'/brands/' + comment.brand._id">
          {{ comment.brand.name }}
        </nuxt-link>
      </dd>
      <dt>日本酒</dt>
      <dd>
        <nuxt-link v-if="comment.sake" :to="'/sakes/' + comment.sake._id">
          {{ comment.sake.name }}
        </nuxt-link>
      </dd>
      <hr />
      <p class="comment">{{ comment.comment }}</p>
      <h6>By {{ author }}</h6>
      <hr />
      <dt>合うおつまみ</dt>
      <dd>
        <h5>
          <nuxt-link
            v-for="mariages in comment.mariages"
            :key="mariages"
            :to="'/sakes?type=' + mariages"
            class="badge badge-pill badge-small badge-primary p-2 m-1"
            >{{ mariages }}</nuxt-link
          >
        </h5>
      </dd>
    </dl>

    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <b-button
          variant="light"
          :to="'/comments/' + comment._id + '/update'"
          class="mr-3"
          >編集</b-button
        >
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/comments">一覧に戻る</b-button>
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures');

export default {
  components: {},
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/comments/' + context.route.params.id
    );
    const author = data.author;
    if (author) {
      return {
        comment: data,
        author: author,
      };
    } else {
      const userId = data.userId;
      if (userId) {
        const response = await context.$axios.get(`/api/users/${userId}/name`);
        return {
          comment: data,
          author: response.data.name,
        };
      } else {
        return {
          comment: data,
          author: '',
        };
      }
    }
  },
  data() {
    return {
      prefectures: Prefectures.prefectures,
      search: {
        comment: this.$route.params.id,
      },
      author: '',
    };
  },

  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/comments/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$store.dispatch('flash/show', {
                text: '削除しました',
                mode: 'alert-info',
              });
              this.$router.push({ name: 'comments' });
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
<style scoped>
.show_image {
  max-height: 600px;
  max-width: 100%;
}
.comment {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
