<template>
  <div>
    <h1>醸造データ 更新</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">
          <h3>{{bydata.sake.name}}</h3>
          <div class="form-group">
            <label for="">醸造年</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.makedBY }"
              v-model="bydata.makedBY">
            <div class="invalid-feedback" v-if="errors && errors.makedBY">
              {{ errors.makedBY.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="bydata.aminoAcidContent[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="bydata.aminoAcidContent[1]">
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
                v-model="bydata.alcoholContent[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
                v-model="bydata.alcoholContent[1]">
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
                v-model="bydata.sakeMeterValue[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
                v-model="bydata.sakeMeterValue[1]">
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
                v-model="bydata.acidity[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
                v-model="bydata.acidity[1]">
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
                v-model="bydata.ricePolishingRate[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
                v-model="bydata.ricePolishingRate[1]">
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
              v-model="bydata.sakeYeast">
            <div class="invalid-feedback" v-if="errors && errors.sakeYeast">
              {{ errors.sakeYeast.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">麹米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.riceForMakingKoji }"
              v-model="bydata.riceForMakingKoji">
            <div class="invalid-feedback" v-if="errors && errors.riceForMakingKoji">
              {{ errors.riceForMakingKoji.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">掛米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.sakeRiceExceptForKojiMaking }"
              v-model="bydata.sakeRiceExceptForKojiMaking">
            <div class="invalid-feedback" v-if="errors && errors.sakeRiceExceptForKojiMaking">
              {{ errors.sakeRiceExceptForKojiMaking.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/bydatas/' + $route.params.id" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrandSelect from '@/components/BrandSelect.vue'
import BrewerySelect from '@/components/BrewerySelect.vue'
import TagSelect from '@/components/TagSelect.vue'
export default {
  components: {
    BrandSelect,
    BrewerySelect,
    TagSelect
  },
  middleware: ['authenticated'],

  async asyncData(context){
    const {data} = await context.$axios.get('/api/bydatas/' + context.route.params.id)
    return {
      bydata : data
    }
  },

  data(){
    return{
      errors:null,
    }
  },

  methods:{
    submitForm(){
      this.$axios.put( '/api/bydatas/' + this.$route.params.id , this.bydata)
        .then((response) => {
          if(response.data._id){
            this.$store.dispatch('flash/show', {text: '更新しました', mode: 'alert-success'})
            this.$router.push({ name:'bydatas-id', params:{ updated:'yes', id: this.$route.params.id } })
          }
        })
        .catch( (error) => {
          if(error){
            this.errors = error
          }
        });
    },
  }
}
</script>
