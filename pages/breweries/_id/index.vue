<template>
  <div>
    <h1>酒蔵 詳細</h1>

    <hr />

    <small v-if="brewery">{{ brewery.breweryId }}</small>
    <h2 v-if="brewery">{{ brewery.name }}</h2>
    <h6 v-if="brewery">{{ brewery.kana }}</h6>

    <h6 v-if="author">By {{ author }}</h6>

    <dl>
      <dt>都道府県</dt>
      <dd>
        <p v-if="brewery">{{ prefectures[brewery.prefecture] }}</p>
      </dd>
      <dt>住所</dt>
      <dd>
        <p v-if="brewery">{{ brewery.address }}</p>
        <p v-if="brewery">{{ brewery.latitude }}</p>
        <p v-if="brewery">{{ brewery.longitude }}</p>
      </dd>
      <dt>Eメール</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="'mailto:' + brewery.email" target="_blank">{{ brewery.email }}</a></p>
      </dd>
      <dt>電話番号</dt>
      <dd>
        <p v-if="brewery">{{ brewery.tel }}</p>
      </dd>
      <dt>FAX番号</dt>
      <dd>
        <p v-if="brewery">{{ brewery.fax }}</p>
      </dd>
      <dt>URL</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.url">{{ brewery.url }}</a></p>
      </dd>
      <dt>購入URL</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.ecurl">{{ brewery.ecurl }}</a></p>
      </dd>
      <dt>Facebook</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.facebook">{{ brewery.facebook }}</a></p>
      </dd>
      <dt>Twitter</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.twitter">{{ brewery.twitter }}</a></p>
      </dd>
      <dt>Instagram</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.instagram">{{ brewery.instagram }}</a></p>
      </dd>
      <dt>その他SNS</dt>
      <dd>
        <p><a v-if="brewery" v-bind:href="brewery.othersns">{{ brewery.othersns }}</a></p>
      </dd>
      <dt>見学</dt>
      <dd>
        <p v-if="brewery">{{ brewery.visit }}</p>
      </dd>
      <dt>試飲</dt>
      <dd>
        <p v-if="brewery">{{ brewery.tasting }}</p>
      </dd>
      <dt>併設カフェ</dt>
      <dd>
        <p v-if="brewery">{{ brewery.cafe }}</p>
      </dd>
      <dt>併設ショップ</dt>
      <dd>
        <p v-if="brewery">{{ brewery.shop }}</p>
      </dd>
      <dt>日本酒以外の醸造・蒸留</dt>
      <dd>
        <p v-if="brewery">{{ brewery.otherBrewing }}</p>
      </dd>
      <dt>創業年</dt>
      <dd>
        <p v-if="brewery.startYear">{{ brewery.startYear }}年</p>
      </dd>
      <dt v-if="brewery.endYear">廃業年</dt>
      <dd>
        <p v-if="brewery.endYear">{{ brewery.endYear }}年</p>
      </dd>
    </dl>

    <div class="d-flex justify-content-between">
      <div>
        <b-button
          variant="light"
          :to="'/breweries/' + brewery._id + '/update'"
          class="mr-3"
          >編集</b-button
        >
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/breweries">一覧に戻る</b-button>
    </div>
    <hr />
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>銘柄</h3>
        <b-button variant="success" :to="'/brands/add?brewery=' + brewery._id"
          >銘柄追加</b-button
        >
      </div>
      <brand-list :search="search" class="m-3" />
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>投稿一覧</h3>
        <div class="d-flex justify-content-between">
          <div></div>
          <b-button
            variant="success"
            :to="'/comments/add?brewery=' + brewery._id"
            >投稿追加</b-button
          >
        </div>
      </div>
      <comment-list :brewery="brewery._id" />
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures');
import BrandList from '@/components/BrandList.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  components: {
    BrandList,
    CommentList,
  },
  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/breweries/' + context.route.params.id
    );
    const author = data.author;
    if (author) {
      return {
        brewery: data,
        author: author,
      };
    } else {
      const userId = data.userId;
      if (userId) {
        const response = await context.$axios.get(`/api/users/${userId}/name`);
        return {
          brewery: data,
          author: response.data.name,
        };
      } else {
        return {
          brewery: data,
          author: '',
        };
      }
    }
  },
  data() {
    return {
      prefectures: Prefectures.prefectures,
      search: {
        brewery: this.$route.params.id,
      },
      author: '',
    };
  },
  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/breweries/' + this.$route.params.id)
          .then((response) => {
            if (response.data._id) {
              this.$store.dispatch('flash/show', {
                text: '削除しました',
                mode: 'alert-info',
              });
              this.$router.push({ name: 'breweries' });
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
