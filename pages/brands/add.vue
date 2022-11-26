<template>
  <div>
    <h1>銘柄 追加</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">名前 <small>*必須</small></label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
            />
            <div v-if="errors && errors.name" class="invalid-feedback">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ふりがな</label>
            <input
              v-model="kana"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.kana }"
            />
            <div v-if="errors && errors.kana" class="invalid-feedback">
              {{ errors.kana.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵 <small>*必須</small></label>
            <brewery-select
              v-model="brewery"
              :class="{ 'is-invalid': errors && errors.brewery }"
            />
            <div v-if="errors && errors.brewery" class="invalid-feedback">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ロゴURL</label>
            <input
              v-model="logo"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.logo }"
            />
            <div v-if="errors && errors.logo" class="invalid-feedback">
              {{ errors.logo.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">こだわり</label>
            <textarea
              v-model="description"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
            ></textarea>
            <div v-if="errors && errors.description" class="invalid-feedback">
              {{ errors.description.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">追加</b-button>
          <b-button to="/brands" class="mr-3">キャンセル</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrewerySelect from '@/components/BrewerySelect.vue';
export default {
  components: {
    BrewerySelect,
  },
  middleware: ['authenticated'],
  async asyncData(context) {
    if (context.route.query.brewery) {
      const { data } = await context.$axios.get(
        '/api/breweries/' + context.route.query.brewery
      );
      return {
        brewery: data,
      };
    }
  },

  data() {
    return {
      errors: null,
      name: null,
      kana: null,
      brewery: null,
      logo: null,
      description: null,
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post('/api/brands', {
          name: this.name,
          kana: this.kana,
          brewery: this.brewery,
          logo: this.logo,
          description: this.description,
        })
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '追加しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'brands-id',
              params: { id: response.data._id },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
