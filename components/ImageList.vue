<template>
  <div class="col-12">
    <div v-if="list.length" class="d-flex flex-wrap justify-content-around">
      <nuxt-link
        v-for="item in list"
        :key="item._id"
        :to="urlPrefix + item._id"
        class="d-block show-comment text-center align-middle card m-1"
      >
        <b-img-lazy
          v-show="item.image"
          :src="item.image"
          rounded
          :alt="item.comment"
          class="item-image"
        />
        <div v-show="item.comment" class="item-comment lead p-2">
          <span>
            {{ item.comment | omitted }}
          </span>
        </div>
      </nuxt-link>
    </div>
    <div v-else class="alert alert-warning">データがありません</div>
  </div>
</template>

<script>
const ImageListItem = {
  _id: Number,
  image: String,
  comment: String,
};

export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    urlPrefix: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.item-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}
.item-comment {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #ffffffc0;
}
.show-comment {
  width: 19%;
  min-height: 17vw;
  min-width: 17vw;
  position: relative;
}

@media screen and (max-width: 992px) {
  .show-comment {
    width: 22%;
    min-height: 20vw;
    min-width: 20vw;
  }
}

@media screen and (max-width: 768px) {
  .show-comment {
    width: 30%;
    min-height: 27vw;
    min-width: 27vw;
  }
}

@media screen and (max-width: 576px) {
  .show-comment {
    width: 45%;
    min-height: 40vw;
    min-width: 40vw;
  }
}
</style>
