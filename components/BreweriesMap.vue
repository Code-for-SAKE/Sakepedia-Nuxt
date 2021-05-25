<template>
  <client-only>
    <div id="map">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <div
          v-for="(brewery_position, index) in brewery_positions"
          :key="index"
        >
          <l-marker :lat-lng="brewery_position">
            <l-popup :content="`${brewery_position.name}`"></l-popup>
          </l-marker>
        </div>
      </l-map>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      center: [35.999887, 138.75],
      zoom: 4,
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      brewery_positions: [],
    };
  },
  head() {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://cdn.geolonia.com/community-geocoder.js',
          defer: true,
        },
      ],
    };
  },
  mounted() {
    this.$axios.get('/api/locations/breweries').then((response) => {
      this.brewery_positions = [];
      response.data.map((brewery) => {
        brewery['lat'] = brewery.latitude;
        brewery['lng'] = brewery.longitude;
        this.brewery_positions.push(brewery);
      });
    });
  },
};
</script>

<style scoped>
#map {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
}
</style>
