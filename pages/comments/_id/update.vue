<template>
  <div>
    <h1>投稿 更新</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">コメント</label>
            <flex-textarea
              v-model="comment.comment"
              inner-class="form-control"
              :class="{ 'is-invalid': errors && errors.comment }"
            />
            <div v-if="errors && errors.comment" class="invalid-feedback">
              {{ errors.comment.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">画像</label>
            <image-uploader
              v-model="comment.image"
              :params="{ limit: 100, unit: 'mb', allow: 'jpg,png' }"
            />
            <b-img
              v-show="comment.image"
              class="show_image mt-3"
              :src="comment.image"
            />
            <div v-if="errors && errors.image" class="invalid-feedback">
              {{ errors.image.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              v-model="comment.brewery"
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
              v-model="comment.brand"
              :class="{ 'is-invalid': errors && errors.brand }"
            />
            <div v-if="errors && errors.brand" class="invalid-feedback">
              {{ errors.brand.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">日本酒</label>
            <sake-select
              ref="sake_search"
              v-model="comment.sake"
              :class="{ 'is-invalid': errors && errors.sake }"
            />
            <div v-if="errors && errors.sake" class="invalid-feedback">
              {{ errors.sake.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/comments/' + $route.params.id" class="mr-3"
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
import SakeSelect from '@/components/SakeSelect.vue';
import ImageUploader from '@/components/ImageUploader.vue';
import FlexTextarea from '@/components/FlexTextarea.vue';
export default {
  components: {
    BrandSelect,
    BrewerySelect,
    SakeSelect,
    ImageUploader,
    FlexTextarea,
  },
  middleware: ['authenticated'],

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/comments/' + context.route.params.id
    );
    return {
      comment: data,
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
        .put('/api/comments/' + this.$route.params.id, this.comment)
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '更新しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'comments-id',
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
<style scoped>
.show_image {
  max-height: 300px;
  max-width: 100%;
}
</style>
