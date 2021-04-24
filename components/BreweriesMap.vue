<template>
  <div id="map">
    <client-only>
        <!-- 気仙沼大島の緯度・経度 -->
        <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-for="marker of marker" :lat-lng="marker" :key="marker"}></l-marker>
        </l-map>
    </client-only>
    </div>
</template>

<script>
export default{
  data() {
    return{
      // leafletの設定
      center: [38.856355,141.615593],
      zoom: 13,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      // マーカーを置く場所一覧（観光地）
      marker: {
        center:  [38.856355,141.615593],
        kugunaribeach: [38.873171,141.63164],
        mtkame: [38.87373,141.617855],
        tatsumai: [38.830445,141.624526],
        kodanobeach: [38.851971,141.622216],
        bridge: [38.878459,141.606309]
      },
      brewery_positions : []

    }
  },
  mounted(){
    this.$axios.get('/api/locations/breweries').then((response) => {
        this.brewery_positions = response.data;
    });
  }
}
</script>

<style scoped>
#map {
    height: 400px;
    width: 400px;
}
</style>