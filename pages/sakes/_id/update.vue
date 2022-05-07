<template>
  <div>
    <h1>日本酒 更新</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">名前</label>
            <input
              v-model="sake.name"
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
              v-model="sake.brewery"
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
              v-model="sake.brand"
              :class="{ 'is-invalid': errors && errors.brand }"
            />
            <div v-if="errors && errors.brand" class="invalid-feedback">
              {{ errors.brand.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">副題</label>
            <input
              v-model="sake.subname"
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
            <tag-select v-model="sake.type" />
            <div v-if="errors && errors.type" class="invalid-feedback">
              {{ errors.type.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">合うおつまみ</label>
            <mariage-select v-model="sake.mariages" />
            <div v-if="errors && errors.mariages" class="invalid-feedback">
              {{ errors.mariages.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">説明</label>
            <textarea
              v-model="sake.description"
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
              v-model="sake.url"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
            />
            <div v-if="errors && errors.url" class="invalid-feedback">
              {{ errors.url.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/sakes/' + $route.params.id" class="mr-3"
            >キャンセル</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrandSelect from '@/components/BrandSelect.vue';
import BrewerySelect from '@/components/BrewerySelect.vue';
import TagSelect from '@/components/TagSelect.vue';
import MariageSelect from '@/components/MariageSelect.vue';
export default {
  components: {
    BrandSelect,
    BrewerySelect,
    TagSelect,
    MariageSelect,
  },
  middleware: ['authenticated'],

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/sakes/' + context.route.params.id
    );
    return {
      sake: data,
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
        .put('/api/sakes/' + this.$route.params.id, this.sake)
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '更新しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'sakes-id',
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
