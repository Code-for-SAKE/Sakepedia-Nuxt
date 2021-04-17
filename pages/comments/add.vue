<template>
  <div>
    <h1>投稿 追加</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">コメント</label>
            <flex-textarea inner-class="form-control"
              :class="{ 'is-invalid': errors && errors.comment }"
              v-model="comment" />
            <div class="invalid-feedback" v-if="errors && errors.comment">
              {{ errors.comment.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">画像</label>
            <image-uploader
              :params="{ limit: 100, unit: 'mb', allow: 'jpg,png' }"
              v-model="image"
            />
            <b-img class="show_image" :src="image" v-show="image"/>
            <div class="invalid-feedback" v-if="errors && errors.image">
              {{ errors.image.msg }}
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

          <b-button variant="primary" type="submit" class="mr-3">追加</b-button>
          <b-button to="/comments" class="mr-3">キャンセル</b-button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrewerySelect from '@/components/BrewerySelect.vue'
import BrandSelect from '@/components/BrandSelect.vue'
import SakeSelect from '@/components/SakeSelect.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import FlexTextarea from '@/components/FlexTextarea.vue'
export default {
  components: {
    BrewerySelect,
    BrandSelect,
    SakeSelect,
    ImageUploader,
    FlexTextarea
  },
  middleware: ['authenticated'],

  data(){
    return{
      errors:null,
      comment:null,
      image:null,
      brand:null,
      brewery:null,
      sake:null,
    }
  },
  async asyncData(context){
    if(context.route.query.sake) {
      const {data} = await context.$axios.get('/api/sakes/' + context.route.query.sake)
      return {
        brand : data.brand,
        brewery : data.brewery,
        sake : data,
      }
    }
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
      this.$axios.post( '/api/comments', {
          comment: this.comment,
          image: this.image,
          brand: this.brand,
          brewery: this.brewery,
          sake: this.sake,
        })
        .then((response) => {
          if(response.data._id){
            this.$router.push({ name:'comments', params:{ created:'yes' } })
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
<style scoped>
.show_image {
/*  display: none;*/
  max-height: 300px;
  max-width: 100%;
}
</style>
