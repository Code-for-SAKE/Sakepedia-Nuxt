<template>
  <div>
    <!-- <h1>Sakepedia Nuxt版</h1>
    <hr /> -->
    <div class="row">
      <div class="col-md-4 my-3">
        <ul class="list-group">
          <li class="list-group-item disabled font-weight-bold text-white bg-info bg-gradient-1">おすすめ酒蔵マップ</li>
          <li class="list-group-item">すべての酒蔵</li>
        </ul>
      </div>
      <div id="map" class="col-md-8 my-3">
        <breweries-map />
      </div>
    </div>
  </div>
</template>

<script>
import BreweriesMap from '@/components/BreweriesMap.vue';
export default {
  components: {
    BreweriesMap,
  },
};
</script>

<style scoped>
#map {
  min-height: 500px;
}
</style>
