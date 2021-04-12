<template>
  <div class="col-12">
    <div class="d-flex flex-wrap justify-content-around "
      v-if="list.length">
      <nuxt-link
        v-for="item in list"
        :to="urlPrefix + item._id"
        :key="item._id"
        class="d-block show-comment text-center align-middle card m-1">
        <b-img-lazy :src="item.image" rounded :alt="item.comment"
          v-show="item.image"
          class="item-image"
        />
        <div v-show="item.comment"
          class="item-comment lead p-2"
        >
          <span>
            {{item.comment | omitted}}
          </span>
        </div>
      </nuxt-link>
    </div>
    <div class="alert alert-warning"
      v-else>
      データがありません
    </div>
  </div>
</template>

<script>

const ImageListItem = {
  _id : Number,
  image : String,
  comment : String
}

export default {
  props: {
    id: Number,
    list: ImageListItem,
    urlPrefix: String,
  },
}
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
