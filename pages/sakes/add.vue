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
            <label for="">銘柄名</label>
            <brand-select
              ref="brand_search"
              :class="{ 'is-invalid': errors && errors.brand }"
              v-model="brand"
            />
            <div class="invalid-feedback" v-if="errors && errors.brand">
              {{ errors.brand.msg }}
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
            <tag-select v-model="type" />
            <div class="invalid-feedback" v-if="errors && errors.type">
              {{ errors.type.msg }}
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
import BrandSelect from '@/components/BrandSelect.vue'
import TagSelect from '@/components/TagSelect.vue'
export default {
  components: {
    BrewerySelect,
    BrandSelect,
    TagSelect
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
      description:null,
      url:null,
    }
  },
  async asyncData(context){
    if(context.route.query.brand) {
      const {data} = await context.$axios.get('/api/brands/' + context.route.query.brand)
      return {
        brand : data,
        brewery : data.brewery
      }
    }
    if(context.route.query.brewery) {
      const {data} = await context.$axios.get('/api/breweries/' + context.route.query.brewery)
      return {
        brewery : data,
      }
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/api/sakes', {
          name: this.name,
          brand: this.brand,
          brewery: this.brewery,
          subname: this.subname,
          type: this.type,
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
