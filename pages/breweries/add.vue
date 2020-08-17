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
            <label for="">名前</label>
            <input type="text" class="form-control"
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
      name:null,
      kana:null,
      prefecture:null,
      address:null,
      email:null,
      tel:null,
      url:null,
      prefectures : Prefectures.prefectures
    }
  },

  mounted(){
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/breweries', {
          name: this.name,
          kana: this.kana,
          prefecture: this.prefecture,
          address: this.address,
          email: this.email,
          tel: this.tel,
          url: this.url,
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
