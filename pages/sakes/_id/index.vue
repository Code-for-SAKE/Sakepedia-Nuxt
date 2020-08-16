<template>
  <div>
    <h1>日本酒 詳細</h1>

    <hr>

    <h2>{{ sake.name }}</h2>
    <h4>{{ sake.subname }}</h4>
    <h6>By {{ sake.author }} </h6>

    <dl>
      <dt>酒蔵</dt>
      <dd>{{ sake.brewery }}</dd>
      <dt>銘柄</dt>
      <dd>{{ sake.brand }}</dd>
      <dt>分類</dt>
      <dd>{{ sake.type }}</dd>
      <dt>アミノ酸度</dt>
      <dd><range-value v-bind:values="sake.aminoAcidContent" /></dd>
      <dt>アルコール度</dt>
      <dd><range-value v-bind:values="sake.alcoholContent" /></dd>
      <dt>日本酒度</dt>
      <dd><range-value v-bind:values="sake.sakeMeterValue" /></dd>
      <dt>酸度</dt>
      <dd><range-value v-bind:values="sake.acidity" /></dd>
      <dt>精米歩合</dt>
      <dd><range-value v-bind:values="sake.ricePolishingRate" /></dd>
      <dt>酵母</dt>
      <dd>{{ sake.sakeYeast }}</dd>
      <dt>酒米(掛米)</dt>
      <dd>{{ sake.sakeRiceExceptForKojiMaking }}</dd>
      <dt>麹米</dt>
      <dd>{{ sake.riceForMakingKoji }}</dd>
      <dt>金額</dt>
      <dd>{{ sake.price }}</dd>
      <dt>受賞歴</dt>
      <dd>{{ sake.award }}</dd>
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
      <b-button variant="secondary" to="/sakes" class="mr-3">一覧に戻る</b-button>
    </div>
  </div>
</template>

<script>
const Prefectures = require('@/utils/prefectures')
import RangeValue from '@/components/RangeValue.vue'

export default {
  components: {
    RangeValue
  },

  async asyncData(context){
    const {data} = await context.$axios.get('/api/sakes/' + context.route.params.id)
    return {
      sake : data,
      prefectures : Prefectures.prefectures
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
