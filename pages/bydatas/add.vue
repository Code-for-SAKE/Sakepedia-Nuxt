<template>
  <div>
    <h1>日本酒醸造データ 追加</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">日本酒</label>
            <sake-select
              ref="sake_search"
              :class="{ 'is-invalid': errors && errors.sake }"
              v-model="sake"
            />
            <div class="invalid-feedback" v-if="errors && errors.sake">
              {{ errors.sake.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">醸造年</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.makedBY }"
              v-model="makedBY">
            <div class="invalid-feedback" v-if="errors && errors.makedBY">
              {{ errors.makedBY.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="aminoAcidContentMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="aminoAcidContentMax">
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div class="invalid-feedback" v-if="errors && errors.aminoAcidContent">
              {{ errors.aminoAcidContent.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アルコール度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
                v-model="alcoholContentMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
                v-model="alcoholContentMax">
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div class="invalid-feedback" v-if="errors && errors.alcoholContent">
              {{ errors.alcoholContent.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">日本酒度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
                v-model="sakeMeterValueMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
                v-model="sakeMeterValueMax">
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div class="invalid-feedback" v-if="errors && errors.sakeMeterValue">
              {{ errors.sakeMeterValue.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酸度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
                v-model="acidityMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
                v-model="acidityMax">
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div class="invalid-feedback" v-if="errors && errors.acidity">
              {{ errors.acidity.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">精米歩合</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
                v-model="ricePolishingRateMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
                v-model="ricePolishingRateMax">
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div class="invalid-feedback" v-if="errors && errors.ricePolishingRate">
              {{ errors.ricePolishingRate.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酵母</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.sakeYeast }"
              v-model="sakeYeast">
            <div class="invalid-feedback" v-if="errors && errors.sakeYeast">
              {{ errors.sakeYeast.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">麹米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.riceForMakingKoji }"
              v-model="riceForMakingKoji">
            <div class="invalid-feedback" v-if="errors && errors.riceForMakingKoji">
              {{ errors.riceForMakingKoji.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">掛米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.sakeRiceExceptForKojiMaking }"
              v-model="sakeRiceExceptForKojiMaking">
            <div class="invalid-feedback" v-if="errors && errors.sakeRiceExceptForKojiMaking">
              {{ errors.sakeRiceExceptForKojiMaking.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">製造年月日</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.bottledDate }"
              v-model="bottledDate">
            <div class="invalid-feedback" v-if="errors && errors.bottledDate">
              {{ errors.bottledDate.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">追加</b-button>
          <b-button to="/bydatas" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SakeSelect from '@/components/SakeSelect.vue'
import TagSelect from '@/components/TagSelect.vue'
export default {
  components: {
    SakeSelect,
    TagSelect
  },
  middleware: ['authenticated'],
  data(){
    return{
      errors:null,
      sake:null,
      makedBY:null,
      aminoAcidContentMin:null,
      aminoAcidContentMax:null,
      alcoholContentMin:null,
      alcoholContentMax:null,
      sakeMeterValueMin:null,
      sakeMeterValueMax:null,
      acidityMin:null,
      acidityMax:null,
      ricePolishingRateMin:null,
      ricePolishingRateMax:null,
      sakeYeast:null,
      riceForMakingKoji:null,
      sakeRiceExceptForKojiMaking:null,
      bottledDate:null,
    }
  },
  async asyncData(context){
    console.log(context.route.query.sake)
    if(context.route.query.sake) {
      const {data} = await context.$axios.get('/api/sakes/' + context.route.query.sake)
      return {
        brand : data.brand,
        brewery : data.brewery,
        sake : data,
      }
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/api/bydatas', {
          sake: this.sake,
          makedBY: this.makedBY,
          aminoAcidContent: [this.aminoAcidContentMin,this.aminoAcidContentMax],
          alcoholContent: [this.alcoholContentMin,this.alcoholContentMax],
          sakeMeterValue: [this.sakeMeterValueMin,this.sakeMeterValueMax],
          acidity: [this.acidityMin,this.acidityMax],
          ricePolishingRate: [this.ricePolishingRateMin,this.ricePolishingRateMax],
          sakeYeast: this.sakeYeast,
          riceForMakingKoji: this.riceForMakingKoji,
          sakeRiceExceptForKojiMaking: this.sakeRiceExceptForKojiMaking,
          bottledDate: this.bottledDate,
        })
        .then((response) => {
          if(response.data._id){
            this.$router.push({ name:'bydatas', params:{ created:'yes' } })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>
