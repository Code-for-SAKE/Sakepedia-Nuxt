<template>
  <div>
    <h1>銘柄 更新</h1>
    <hr />
    {{errors}}
    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">名前</label>
            <input
              v-model="brand.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
            />
            <div v-if="errors && errors.name" class="invalid-feedback">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              v-model="brand.brewery"
              :class="{ 'is-invalid': errors && errors.brewery }"
            />
            <div v-if="errors && errors.brewery" class="invalid-feedback">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ロゴURL</label>
            <input
              v-model="brand.logo"
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
              v-model="brand.description"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
            ></textarea>
            <div v-if="errors && errors.description" class="invalid-feedback">
              {{ errors.description.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/brands/' + $route.params.id" class="mr-3"
            >キャンセル</b-button
          >
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
    const { data } = await context.$axios.get(
      '/api/brands/' + context.route.params.id
    );
    return {
      brand: data,
    };
  },

  data() {
    return {
      errors: null,
      searchedBreweries: [],
    };
  },

  methods: {
    submitForm() {
      this.$axios
        .put('/api/brands/' + this.$route.params.id, this.brand)
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '更新しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'brands-id',
              params: { id: this.$route.params.id },
            });
          }
        })
        .catch((error) => {
          if (error) {
            this.errors = error;
          }
        });
    },
  },
};
</script>
