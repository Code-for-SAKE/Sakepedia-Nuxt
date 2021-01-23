<template>
  <div>
    <h1>銘柄 更新</h1>
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
              v-model="brand.name">
            <div class="invalid-feedback" v-if="errors && errors.name">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              :class="{ 'is-invalid': errors && errors.brewery }"
              v-model="brand.brewery"
            />
            <div class="invalid-feedback" v-if="errors && errors.brewery">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ロゴURL</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.logo }"
              v-model="brand.logo">
            <div class="invalid-feedback" v-if="errors && errors.logo">
              {{ errors.logo.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">こだわり</label>
            <textarea type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
              v-model="brand.description"></textarea>
            <div class="invalid-feedback" v-if="errors && errors.description">
              {{ errors.description.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/brands/' + $route.params.id" class="mr-3">キャンセル</b-button>

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
    const {data} = await context.$axios.get('/api/brands/' + context.route.params.id)
    return {
      brand : data,
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
      this.$axios.put( '/api/brands/' + this.$route.params.id , this.brand)
        .then((response) => {
          if(response.data._id){
            this.$store.dispatch('flash/show', {text: '更新しました', mode: 'alert-success'})
            this.$router.push({ name:'brands-id', params:{ updated:'yes', id: this.$route.params.id } })
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
