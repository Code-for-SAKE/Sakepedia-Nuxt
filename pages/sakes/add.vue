<template>
  <div>
    <h1>日本酒 追加</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">名前</label>
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
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              v-model="brewery"
              :class="{ 'is-invalid': errors && errors.brewery }"
            />
            <div v-if="errors && errors.brewery" class="invalid-feedback">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">銘柄名</label>
            <brand-select
              ref="brand_search"
              v-model="brand"
              :class="{ 'is-invalid': errors && errors.brand }"
            />
            <div v-if="errors && errors.brand" class="invalid-feedback">
              {{ errors.brand.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">副題</label>
            <input
              v-model="subname"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.subname }"
            />
            <div v-if="errors && errors.subname" class="invalid-feedback">
              {{ errors.subname.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">分類</label>
            <tag-select v-model="type" />
            <div v-if="errors && errors.type" class="invalid-feedback">
              {{ errors.type.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">説明</label>
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

          <div class="form-group">
            <label for="">URL</label>
            <input
              v-model="url"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
            />
            <div v-if="errors && errors.url" class="invalid-feedback">
              {{ errors.url.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">追加</b-button>
          <b-button to="/sakes" class="mr-3">キャンセル</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrewerySelect from '@/components/BrewerySelect.vue';
import BrandSelect from '@/components/BrandSelect.vue';
import TagSelect from '@/components/TagSelect.vue';
export default {
  components: {
    BrewerySelect,
    BrandSelect,
    TagSelect,
  },
  middleware: ['authenticated'],
  async asyncData(context) {
    if (context.route.query.brand) {
      const { data } = await context.$axios.get(
        '/api/brands/' + context.route.query.brand
      );
      return {
        brand: data,
        brewery: data.brewery,
      };
    }
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
      brand: null,
      brewery: null,
      subname: null,
      type: null,
      description: null,
      url: null,
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post('/api/sakes', {
          name: this.name,
          brand: this.brand,
          brewery: this.brewery,
          subname: this.subname,
          type: this.type,
          description: this.description,
          url: this.url,
        })
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '追加しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'sakes-id',
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
