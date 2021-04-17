<template>
  <div>
    <h1>銘柄 追加</h1>
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
              :class="{ 'is-invalid': errors && errors.brewery }"
              v-model="brewery" />
            <div class="invalid-feedback" v-if="errors && errors.brewery">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ロゴURL</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.logo }"
              v-model="logo">
            <div class="invalid-feedback" v-if="errors && errors.logo">
              {{ errors.logo.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">こだわり</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
              v-model="description"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">追加</b-button>
          <b-button to="/brands" class="mr-3">キャンセル</b-button>

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
      brewery:null,
      logo:null,
      description:null,
    }
  },
  async asyncData(context){
    if(context.route.query.brewery) {
      const {data} = await context.$axios.get('/api/breweries/' + context.route.query.brewery)
      return {
        brewery : data,
      }
    }
  },
  methods:{
    submitForm(){
      this.$axios.post( '/api/brands', {
          name: this.name,
          brewery: this.brewery,
          logo: this.logo,
          description: this.description,
        })
        .then((response) => {
          if(response.data._id){
            this.$router.push({ name:'brands', params:{ created:'yes' } })
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
