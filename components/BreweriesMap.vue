<template>
  <client-only>
    <div id="map">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <v-marker-cluster
          v-for="(prefectures, ind) in brewery_positions"
          :key="ind"
          :options="cluster_options"
        >
          <l-marker
            v-for="(point, index) in prefectures"
            :key="index"
            :lat-lng="point"
          >
            <l-popup :content="`${point.name}`"></l-popup>
          </l-marker>
        </v-marker-cluster>
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
      cluster_options: {
        showCoverageOnHover: false,
        maxClusterRadius: 80,
        iconCreateFunction: function (cluster) {
          var childCount = cluster.getChildCount();

          var c = ' marker-cluster-';
          if (childCount < 20) {
            c += 'small';
          } else if (childCount < 50) {
            c += 'medium';
          } else {
            c += 'large';
          }

          return new L.DivIcon({
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster' + c,
          });
        },
      },
      brewery_positions: {},
    };
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.css',
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.4.1/MarkerCluster.Default.css',
        },
      ],
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
    const iconUrl = require('~/assets/icons/sake.svg');
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.imagePath = '';
    L.Icon.Default.mergeOptions({
      iconUrl,
      iconRetinaUrl: iconUrl,
      iconSize: [20, 20],
      iconAnchor: [12, 18],
      popupAnchor: [-3, -24],
      shadowSize: [30, 20],
      shadowAnchor: [12, 18],
    });
    this.$axios.get('/api/locations/breweries').then((response) => {
      this.brewery_positions = {};
      response.data.map((brewery) => {
        brewery['lat'] = brewery.latitude;
        brewery['lng'] = brewery.longitude;
        brewery['prefecture'] = brewery.prefecture
          ? brewery.prefecture
          : brewery.address
          ? brewery.address.replace(
              /^([〒0-9 -]*)(.{2}[都道府県]|.{3}県)(.+)/,
              '$2'
            )
          : '住所なし';
        if (!(brewery['prefecture'] in this.brewery_positions)) {
          this.brewery_positions[brewery['prefecture']] = [];
        }
        this.brewery_positions[brewery['prefecture']].push(brewery);
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
#map >>> .marker-cluster {
  width: 20px !important;
  height: 20px !important;
  margin-top: −10px !important;
  margin-left: -10px !important;
  border-radius: 20px;
}
#map >>> .marker-cluster div {
  width: 16px !important;
  height: 16px !important;
  margin-top: 2px;
  margin-left: 2px;

  border-radius: 16px;
  font-size: 12px;
}
#map >>> .marker-cluster span {
  line-height: 16px;
}
</style>
