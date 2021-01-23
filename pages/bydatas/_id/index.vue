<template>
  <div>
    <h1>日本酒 醸造データ 詳細</h1>

    <hr>

    <h2>{{ bydata.sake ? bydata.sake.name : '' }}</h2>
    <h4>{{ bydata.makedBY }}年</h4>
    <h6>By {{ bydata.author }} </h6>
    <dl>
      <dt>アミノ酸度</dt>
      <dd><range-value v-bind:values="bydata.aminoAcidContent" /></dd>
      <dt>アルコール度数</dt>
      <dd><range-value v-bind:values="bydata.alcoholContent" /></dd>
      <dt>日本酒度</dt>
      <dd><range-value v-bind:values="bydata.sakeMeterValue" /></dd>
      <dt>酸度</dt>
      <dd><range-value v-bind:values="bydata.acidity" /></dd>
      <dt>精米歩合</dt>
      <dd><range-value v-bind:values="bydata.ricePolishingRate" /></dd>
      <dt>酵母</dt>
      <dd><range-value v-bind:values="bydata.sakeYeast" /></dd>
      <dt>麹米</dt>
      <dd><range-value v-bind:values="bydata.riceForMakingKoji" /></dd>
      <dt>掛米</dt>
      <dd><range-value v-bind:values="bydata.sakeRiceExceptForKojiMaking" /></dd>
      <dt>製造年月(日)</dt>
      <dd><range-value v-bind:values="bydata.bottledDate" /></dd>
      <dt>更新日</dt>
      <dd>{{bydata.modifiedAt}}</dd>
    </dl>

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <b-button variant="primary" :to="'/bydatas/' + bydata._id + '/update'" class="mr-3">編集</b-button>
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/bydatas">一覧に戻る</b-button>
    </div>
  </div>
</template>

<script>
import RangeValue from '@/components/RangeValue.vue'

export default {
  components: {
    RangeValue
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/bydatas/' + context.route.params.id)
    return {
      bydata : data,
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/bydatas/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'bydatas', params:{ deleted:'yes' } })
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
