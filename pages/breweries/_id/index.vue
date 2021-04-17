<template>
  <div>
    <h1>酒蔵 詳細</h1>

    <hr>

    <small v-if="brewery">{{ brewery.breweryId }}</small>
    <h2 v-if="brewery">{{ brewery.name }}</h2>
    <h6 v-if="brewery">{{ brewery.kana }}</h6>

    <h6 v-if="brewery.author">By {{ brewery.author.full_name }}</h6>

    <p v-if="brewery">{{ prefectures[brewery.prefecture] }}</p>
    <p v-if="brewery">{{ brewery.address }}</p>
    <p v-if="brewery">{{ brewery.latitude }}</p>
    <p v-if="brewery">{{ brewery.longitude }}</p>
    <p v-if="brewery">{{ brewery.email }}</p>
    <p v-if="brewery">{{ brewery.tel }}</p>
    <p v-if="brewery">{{ brewery.url }}</p>
    <p v-if="brewery">{{ brewery.ecurl }}</p>
    <p v-if="brewery">{{ brewery.facebook }}</p>
    <p v-if="brewery">{{ brewery.twitter }}</p>
    <p v-if="brewery">{{ brewery.instagram }}</p>
    <p v-if="brewery">{{ brewery.othersns }}</p>
    <p v-if="brewery">{{ brewery.startYear }}</p>
    <p v-if="brewery">{{ brewery.endYear }}</p>

    <div class="d-flex justify-content-between">
      <div>
        <b-button variant="primary" :to="'/breweries/' + brewery._id + '/update'" class="mr-3">編集</b-button>
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/breweries">一覧に戻る</b-button>
    </div>
    <hr>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>銘柄</h3>
        <b-button variant="success" :to="'/brands/add?brewery='+brewery._id">銘柄追加</b-button>
      </div>
      <brand-list :search="search" class="m-3" />
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>投稿一覧</h3>
        <div class="d-flex justify-content-between">
          <div>
          </div>
          <b-button variant="success" :to="'/comments/add?brewery=' + brewery._id">投稿追加</b-button>
        </div>
      </div>
      <comment-list :brewery="brewery._id" />
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures')
import BrandList from '@/components/BrandList.vue'
import CommentList from '@/components/CommentList.vue'

export default {
  components: {
    BrandList,
    CommentList
  },
  data() {
    return {
      prefectures : Prefectures.prefectures,
      search: {
        brewery: this.$route.params.id
      }
    }
  },
  async asyncData(context) {
    const {data} = await context.$axios.get('/api/breweries/' + context.route.params.id)
    return {
      brewery : data,
    }
  },
  methods: {
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/breweries/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'breweries' })
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>
