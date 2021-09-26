<template>
  <div>
    <h1>日本酒 詳細</h1>

    <hr />

    <h2>{{ sake.name }}</h2>
    <h4>{{ sake.subname }}</h4>
    <h6>By {{ author }}</h6>
    <dl>
      <dt>酒蔵</dt>
      <dd>
        <nuxt-link v-if="sake.brewery" :to="'/breweries/' + sake.brewery._id">
          {{ sake.brewery.name }}
        </nuxt-link>
      </dd>
      <dt>銘柄</dt>
      <dd>
        <nuxt-link v-if="sake.brand" :to="'/brands/' + sake.brand._id">
          {{ sake.brand.name }}
        </nuxt-link>
      </dd>
      <dt>分類</dt>
      <dd>
        <h3>
          <nuxt-link
            v-for="type in sake.type"
            :key="type"
            :to="'/sakes?type=' + type"
            class="badge badge-pill badge-primary p-2 m-1"
            >{{ type }}</nuxt-link
          >
        </h3>
      </dd>
      <dt>説明</dt>
      <dd>{{ sake.description }}</dd>
      <dt>URL</dt>
      <dd>
        <a v-if="sake.url" :href="sake.url">{{ sake.url }}</a>
      </dd>
    </dl>

    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <b-button
          variant="light"
          :to="'/sakes/' + sake._id + '/update'"
          class="mr-3"
          >編集</b-button
        >
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/sakes">一覧に戻る</b-button>
    </div>
    <hr />
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>最新醸造データ</h3>
      </div>
      <last-brewery-year-data :sake="$route.params.id" class="m-3" />
      <hr />
      <div class="d-flex justify-content-between align-items-center">
        <h3>その他醸造データ</h3>
        <div class="d-flex justify-content-between">
          <div></div>
          <b-button variant="success" :to="'/bydatas/add?sake=' + sake._id"
            >醸造データ追加</b-button
          >
        </div>
      </div>
      <brewery-year-data-list :search="search" class="m-3" />
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>投稿一覧</h3>
        <div class="d-flex justify-content-between">
          <div></div>
          <b-button variant="success" :to="'/comments/add?sake=' + sake._id"
            >投稿追加</b-button
          >
        </div>
      </div>
      <comment-list :sake="sake._id" />
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures');
import BreweryYearDataList from '@/components/BreweryYearDataList.vue';
import LastBreweryYearData from '@/components/LastBreweryYearData.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  components: {
    BreweryYearDataList,
    LastBreweryYearData,
    CommentList,
  },
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/sakes/' + context.route.params.id
    );
    const author = data.author;
    if (author) {
      return {
        sake: data,
        author: author,
      };
    } else {
      const userId = data.userId;
      if (userId) {
        const response = await context.$axios.get(`/api/users/${userId}/name`);
        return {
          sake: data,
          author: response.data.name,
        };
      } else {
        return {
          sake: data,
          author: '',
        };
      }
    }
  },
  data() {
    return {
      prefectures: Prefectures.prefectures,
      search: {
        sake: this.$route.params.id,
      },
    };
  },

  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/sakes/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$store.dispatch('flash/show', {
                text: '削除しました',
                mode: 'alert-info',
              });
              this.$router.push({ name: 'sakes' });
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
