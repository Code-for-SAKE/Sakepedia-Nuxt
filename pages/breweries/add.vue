<template>
  <div>
    <h1>酒蔵 追加</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">法人番号 etc</label>
            <input type="number" class="form-control" required
              :class="{ 'is-invalid': errors && errors.breweryId }"
              v-model="breweryId">
            <div class="invalid-feedback" v-if="errors && errors.breweryId">
              {{ errors.breweryId.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">名前</label>
            <input type="text" class="form-control" required
              :class="{ 'is-invalid': errors && errors.name }"
              v-model="name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ふりがな</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.kana }"
              v-model="kana">
            <div class="invalid-feedback" v-if="errors && errors.kana">
              {{ errors.kana.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">都道府県</label>
            <select class="custom-select"
              :class="{ 'is-invalid': errors && errors.prefecture }"
              v-model="prefecture">
              <option v-for="(item, index) in prefectures" :key=index  v-bind:value="index">
                  {{ item }}
              </option>
            </select>
            <div class="invalid-feedback" v-if="errors && errors.prefecture">
              {{ errors.prefecture.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">住所</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.address }"
              v-model="address">
            <div class="invalid-feedback" v-if="errors && errors.address">
              {{ errors.address.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">緯度</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.latitude }"
              v-model="latitude">
            <div class="invalid-feedback" v-if="errors && errors.latitude">
              {{ errors.latitude.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">経度</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.longitude }"
              v-model="longitude">
            <div class="invalid-feedback" v-if="errors && errors.longitude">
              {{ errors.longitude.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Eメール</label>
            <input type="email" class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email">
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">電話番号</label>
            <input type="tel" class="form-control"
              :class="{ 'is-invalid': errors && errors.tel }"
              v-model="tel">
            <div class="invalid-feedback" v-if="errors && errors.tel">
              {{ errors.tel.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">URL</label>
            <input type="url" class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
              v-model="url">
            <div class="invalid-feedback" v-if="errors && errors.url">
              {{ errors.url.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">創業年</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.startYear }"
              v-model="startYear">
            <div class="invalid-feedback" v-if="errors && errors.startYear">
              {{ errors.startYear.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">廃業年</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.endYear }"
              v-model="endYear">
            <div class="invalid-feedback" v-if="errors && errors.endYear">
              {{ errors.endYear.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" value="追加" class="mr-3">追加</b-button>
          <b-button to="/breweries" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Prefectures = require('../../utils/prefectures')
export default {
  middleware: ['authenticated'],

  data(){
    return{
      errors:null,
      breweryId:null,
      name:null,
      kana:null,
      prefecture:null,
      address:null,
      latitude:null,
      longitude:null,
      email:null,
      tel:null,
      url:null,
      startYear:null,
      endYear:null,
      prefectures : Prefectures.prefectures
    }
  },

  mounted(){
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/breweries', {
          breweryId: this.breweryId,
          name: this.name,
          kana: this.kana,
          prefecture: this.prefecture,
          latitude: this.latitude,
          longitude: this.longitude,
          address: this.address,
          email: this.email,
          tel: this.tel,
          url: this.url,
          startYear: this.startYear,
          endYear: this.endYear,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){

            this.$router.push({ name:'breweries' })
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
