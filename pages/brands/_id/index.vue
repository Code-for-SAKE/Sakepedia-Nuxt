<template>
  <div>
    <h1>銘柄 詳細</h1>

    <hr>

    <h2>{{ brand.name }}</h2>
    <h6>By {{ brand.author }} </h6>

    <dl>
      <dt>酒蔵</dt>
      <dd>
        <nuxt-link
          v-if="brand.brewery"
          :to="'/breweries/' + brand.brewery._id">
          {{ brand.brewery.name }}
        </nuxt-link>
      </dd>
      <dt>ロゴ</dt>
      <dd>{{ brand.logo }}</dd>
      <dt>こだわり</dt>
      <dd>{{ brand.description }}</dd>
    </dl>

    <hr>
    <div class="d-flex justify-content-between">
      <div>
        <b-button variant="primary" :to="'/brands/' + brand._id + '/update'" class="mr-3">編集</b-button>
        <b-button variant="danger" @click="deleteRecord()">削除</b-button>
      </div>
      <b-button variant="secondary" to="/brands">一覧に戻る</b-button>
    </div>
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h3>日本酒</h3>
        <b-button variant="success" :to="'/sakes/add?brand='+brand._id">日本酒追加</b-button>
      </div>
      <sake-list :search="search" class="m-3" />
    </div>
  </div>
</template>

<script>
import SakeList from '@/components/SakeList.vue'


export default {
  components: {
    SakeList
  },
  data() {
    return {
      search: {
        brand: this.$route.params.id
      }
    }
  },
  async asyncData(context){
    const {data} = await context.$axios.get('/api/brands/' + context.route.params.id)
    return {
      brand : data
    }
  },

  methods:{
    deleteRecord(){
      if(confirm("Are you sure?") === true){
        this.$axios.delete('/api/brands/' + this.$route.params.id)
          .then((response) => {
            if(response.data._id){
              this.$router.push({ name:'brands', params:{ deleted:'yes' } })
            }
          })
          .catch( (error) => {
            console.log(error);
          });
      }
    }
  }
}
</script>
