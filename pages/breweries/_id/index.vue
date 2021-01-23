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

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <b-button variant="primary" :to="'/breweries/' + brewery._id + '/update'" class="mr-3">編集</b-button>
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/breweries" class="mr-3">一覧に戻る</b-button>
    </div>
  </div>
</template>

<script>
const Prefectures = require('../../../utils/prefectures')
export default {
  async asyncData(context){
    const {data} = await context.$axios.get('/api/breweries/' + context.route.params.id)
    return {
      brewery : data,
      prefectures : Prefectures.prefectures
    }
  },

  methods:{
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
