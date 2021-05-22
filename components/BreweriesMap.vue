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
  async mounted() {
    const iconUrl = require('~/assets/icons/sake.svg');
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.imagePath = '';
    L.Icon.Default.mergeOptions({
      iconUrl,
      iconRetinaUrl: iconUrl,
    });
    const response = await this.$axios.get('/api/locations/breweries');
    this.brewery_positions = response.data.map((brewery) => {
      return { lat: brewery.latitude, lng: brewery.longitude };
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
