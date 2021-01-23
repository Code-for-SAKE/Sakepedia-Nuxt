<template>
  <div>
    <h1>日本酒 更新</h1>
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
              v-model="sake.name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">銘柄名</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.brand }"
              v-model="sake.brand">
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
              v-model="sake.subname">
            <div class="invalid-feedback" v-if="errors && errors.subname">
              {{ errors.subname.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">分類</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.type }"
              v-model="sake.type">
            <div class="invalid-feedback" v-if="errors && errors.type">
              {{ errors.type.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="sake.aminoAcidContent[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
                v-model="sake.aminoAcidContent[1]">
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
                v-model="sake.alcoholContent[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
                v-model="sake.alcoholContent[1]">
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
                v-model="sake.sakeMeterValue[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
                v-model="sake.sakeMeterValue[1]">
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
                v-model="sake.acidity[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
                v-model="sake.acidity[1]">
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
                v-model="sake.ricePolishingRate[0]"> 〜
              <input type="number" class="form-control col-md-3 d-inline-block" step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
                v-model="sake.ricePolishingRate[1]">
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
              v-model="sake.sakeYeast">
            <div class="invalid-feedback" v-if="errors && errors.sakeYeast">
              {{ errors.sakeYeast.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">麹米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.riceForMakingKoji }"
              v-model="sake.riceForMakingKoji">
            <div class="invalid-feedback" v-if="errors && errors.riceForMakingKoji">
              {{ errors.riceForMakingKoji.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">掛米</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.sakeRiceExceptForKojiMaking }"
              v-model="sake.sakeRiceExceptForKojiMaking">
            <div class="invalid-feedback" v-if="errors && errors.sakeRiceExceptForKojiMaking">
              {{ errors.sakeRiceExceptForKojiMaking.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">内容量</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.volume }"
              v-model="sake.volume">
            <div class="invalid-feedback" v-if="errors && errors.volume">
              {{ errors.volume.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">金額</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.price }"
              v-model="sake.price">
            <div class="invalid-feedback" v-if="errors && errors.price">
              {{ errors.price.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">受賞歴</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.award }"
              v-model="sake.award"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.award">
              {{ errors.award.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">説明</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
              v-model="sake.escription"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">URL</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
              v-model="sake.url">
            <div class="invalid-feedback" v-if="errors && errors.url">
              {{ errors.url.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/sakes/' + $route.params.id" class="mr-3">キャンセル</b-button>

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

  async asyncData(context){
    const {data} = await context.$axios.get('/api/sakes/' + context.route.params.id)
    return {
      sake : data,
      brewery: {name: data.brewery},
    }
  },

  data(){
    return{
      errors:null,
      searchedBreweries : [],
    }
  },

  methods:{
    submitForm(){
      this.sake.brewery = this.brewery.name
      this.$axios.put( '/api/sakes/' + this.$route.params.id , this.sake)
        .then((response) => {
          if(response.data._id){
            this.$store.dispatch('flash/show', {text: '更新しました', mode: 'alert-success'})
            this.$router.push({ name:'sakes-id', params:{ updated:'yes', id: this.$route.params.id } })
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
