<template>
  <div>
    <h1>日本酒 追加</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

<div class="form-group">
            <label for="">名前</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">銘柄名</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.brand }"
              v-model="brand">
            <div class="invalid-feedback" v-if="errors && errors.brand">
              {{ errors.brand.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              :class="{ 'is-invalid': errors && errors.brewery }"
              v-model="brewery"
            />
            <div class="invalid-feedback" v-if="errors && errors.brewery">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">副題</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.subname }"
              v-model="subname">
            <div class="invalid-feedback" v-if="errors && errors.subname">
              {{ errors.subname.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">分類</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.type }"
              v-model="type">
            <div class="invalid-feedback" v-if="errors && errors.type">
              {{ errors.type.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="aminoAcidContentMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" placeholder=""
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
              <input type="number" class="form-control col-md-3 d-inline-block"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
                v-model="alcoholContentMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" placeholder=""
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
              <input type="number" class="form-control col-md-3 d-inline-block"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
                v-model="sakeMeterValueMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" placeholder=""
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
              <input type="number" class="form-control col-md-3 d-inline-block"
                :class="{ 'is-invalid': errors && errors.acidity }"
                v-model="acidityMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" placeholder=""
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
              <input type="number" class="form-control col-md-3 d-inline-block"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
                v-model="ricePolishingRateMin"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" placeholder=""
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
            <label for="">内容量</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.volume }"
              v-model="volume">
            <div class="invalid-feedback" v-if="errors && errors.volume">
              {{ errors.volume.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">金額</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.price }"
              v-model="price">
            <div class="invalid-feedback" v-if="errors && errors.price">
              {{ errors.price.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">受賞歴</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.award }"
              v-model="award"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.award">
              {{ errors.award.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">説明</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
              v-model="description"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">URL</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
              v-model="url">
            <div class="invalid-feedback" v-if="errors && errors.url">
              {{ errors.url.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">追加</b-button>
          <b-button to="/sakes" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrewerySelect from '@/components/BrewerySelect.vue'
export default {
  components: {
    BrewerySelect
  },
  middleware: ['authenticated'],

  data(){
    return{
      errors:null,
      name:null,
      brand:null,
      brewery:null,
      subname:null,
      type:null,
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
      volume:null,
      price:null,
      award:null,
      description:null,
      url:null,
      author:null,
    }
  },

  mounted(){
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/sakes', {
          name: this.name,
          brand: this.brand,
          brewery: this.brewery.name,
          subname: this.subname,
          type: this.type,
          aminoAcidContent: [this.aminoAcidContentMin,this.aminoAcidContentMax],
          alcoholContent: [this.alcoholContentMin,this.alcoholContentMax],
          sakeMeterValue: [this.sakeMeterValueMin,this.sakeMeterValueMax],
          acidity: [this.acidityMin,this.acidityMax],
          ricePolishingRate: [this.ricePolishingRateMin,this.ricePolishingRateMax],
          sakeYeast: this.sakeYeast,
          riceForMakingKoji: this.riceForMakingKoji,
          sakeRiceExceptForKojiMaking: this.sakeRiceExceptForKojiMaking,
          volume: this.volume,
          price: this.price,
          award: this.award,
          description: this.description,
          url: this.url,
        })
        .then((response) => {
          if(response.data._id){
            this.$router.push({ name:'sakes', params:{ created:'yes' } })
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
