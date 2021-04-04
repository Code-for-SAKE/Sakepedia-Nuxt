<template>
  <div>
    <h1>日本酒 詳細</h1>

    <hr>

    <h2>{{ sake.name }}</h2>
    <h4>{{ sake.subname }}</h4>
    <h6>By {{ sake.author }} </h6>
    <dl>
      <dt>酒蔵</dt>
      <dd>
        <nuxt-link
          v-if="sake.brewery"
          :to="'/breweries/' + sake.brewery._id">
          {{ sake.brewery.name }}
        </nuxt-link>
      </dd>
      <dt>銘柄</dt>
      <dd>
        <nuxt-link
          v-if="sake.brand"
          :to="'/brands/' + sake.brand._id">
          {{ sake.brand.name }}
        </nuxt-link>
      </dd>
      <dt>分類</dt>
      <dd>
        <h3>
          <nuxt-link v-for="type in sake.type" :to="'/sakes/?type=' + type" class="badge badge-pill badge-primary p-2 m-1">{{ type }}</nuxt-link>
        </h3>
      </dd>
      <dt>説明</dt>
      <dd>{{ sake.description }}</dd>
      <dt>URL</dt>
      <dd><nuxt-link v-if="sake.url" :to="sake.url">{{sake.url}}</nuxt-link></dd>
    </dl>

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <b-button variant="primary" :to="'/sakes/' + sake._id + '/update'" class="mr-3">編集</b-button>
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/sakes">一覧に戻る</b-button>
    </div>
    <hr>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>最新醸造データ</h3>
      </div>
      <last-brewery-year-data :sake="this.$route.params.id" class="m-3" />
      <hr>
      <div class="d-flex justify-content-between align-items-center">
        <h3>その他醸造データ</h3>
        <div class="d-flex justify-content-between">
          <div>
          </div>
          <b-button variant="success" :to="'/bydatas/add?sake='+sake._id">醸造データ追加</b-button>
        </div>
      </div>
     <brewery-year-data-list :search="search" class="m-3" />
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures')
import BreweryYearDataList from '@/components/BreweryYearDataList.vue'
import LastBreweryYearData from '@/components/LastBreweryYearData.vue'

export default {
  components: {
    BreweryYearDataList,
    LastBreweryYearData
  },
  data() {
    return {
      prefectures : Prefectures.prefectures,
      search: {
        sake: this.$route.params.id
      }
    }
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/sakes/' + context.route.params.id)
    return {
      sake : data
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/sakes/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'sakes', params:{ deleted:'yes' } })
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
