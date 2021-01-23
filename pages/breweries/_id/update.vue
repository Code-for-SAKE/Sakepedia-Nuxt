<template>
  <div>
    <h1>酒蔵 更新</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">法人番号 etc</label>
            <input type="number" class="form-control"
              :class="{ 'is-invalid': errors && errors.breweryId }"
              v-model="breweryId">
            <div class="invalid-feedback" v-if="errors && errors.breweryId">
              {{ errors.breweryId.msg }}
            </div>
          </div>

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
            <label for="">フリガナ</label>
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
            <label for="">購入URL</label>
            <input type="url" class="form-control"
              :class="{ 'is-invalid': errors && errors.ecurl }"
              v-model="ecurl">
            <div class="invalid-feedback" v-if="errors && errors.ecurl">
              {{ errors.ecurl.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Facebook</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.facebook }"
              v-model="facebook">
            <div class="invalid-feedback" v-if="errors && errors.facebook">
              {{ errors.facebook.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Twitter</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.twitter }"
              v-model="twitter">
            <div class="invalid-feedback" v-if="errors && errors.twitter">
              {{ errors.twitter.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Instagram</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.instagram }"
              v-model="instagram">
            <div class="invalid-feedback" v-if="errors && errors.instagram">
              {{ errors.instagram.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">その他SNS</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.othersns }"
              v-model="othersns">
            <div class="invalid-feedback" v-if="errors && errors.othersns">
              {{ errors.othersns.msg }}
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

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/breweries/' + $route.params.id" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Prefectures = require('../../../utils/prefectures')
export default {
  middleware: ['authenticated'],

  async asyncData(context){
    const {data} = await context.$axios.get('/api/breweries/' + context.route.params.id)
    return {
      brewery : data
    }
  },

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
      ecurl:null,
      facebook:null,
      twitter:null,
      instagram:null,
      othersns:null,
      startYear:null,
      endYear:null,
      author: null,
      prefectures : Prefectures.prefectures
    }
  },

  mounted(){
    this.fillFormData()
  },

  methods:{
    fillFormData(){
      this.breweryId = this.brewery.breweryId
      this.name = this.brewery.name
      this.kana = this.brewery.kana
      this.prefecture = this.brewery.prefecture
      this.address = this.brewery.address
      this.latitude = this.brewery.latitude
      this.longitude = this.brewery.longitude
      this.email = this.brewery.email
      this.tel = this.brewery.tel
      this.url = this.brewery.url
      this.ecurl = this.brewery.ecurl
      this.facebook = this.brewery.facebook
      this.twitter = this.brewery.twitter
      this.instagram = this.brewery.instagram
      this.othersns = this.brewery.othersns
      this.startYear = this.brewery.startYear
      this.endYear = this.brewery.endYear
    },

    submitForm(){
      this.$axios.put( '/api/breweries/' + this.$route.params.id , {
          breweryId: this.breweryId,
          name: this.name,
          kana: this.kana,
          prefecture: this.prefecture,
          address: this.address,
          latitude: this.latitude,
          longitude: this.longitude,
          email: this.email,
          tel: this.tel,
          url: this.url,
          ecurl: this.ecurl,
          facebook: this.facebook,
          twitter: this.twitter,
          instagram: this.instagram,
          othersns: this.othersns,
          startYear: this.startYear,
          endYear: this.endYear,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push({ name:'breweries-id', params:{ id: this.$route.params.id } })
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
