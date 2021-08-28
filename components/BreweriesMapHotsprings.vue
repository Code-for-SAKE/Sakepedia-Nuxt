<template>
  <client-only>
    <div id="map">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <v-marker-cluster
          v-for="(locations, ind) in dict_hotsprings"
          :key="ind"
          :options="cluster_options"
        >
          <l-marker
            v-for="(location, index) in locations"
            :key="index"
            :lat-lng="location"
          >
            <l-popup :content="`${location.name}`"></l-popup>
            <l-icon
              :icon-size="[20, 20]"
              :icon-anchor="[12, 18]"
              :popup-anchor="[-3, -24]"
              :shadow-size="[30, 20]"
              :shadow-anchor="[12, 18]"
              :icon-url="`${location.iconUrl}`"/>
          </l-marker>
        </v-marker-cluster>
      </l-map>
    </div>
  </client-only>
</template>

<script>

import hotsprings from '@/data/related_locations/hot_springs.json'

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
      dict_hotsprings: {},
      hotsprings: hotsprings
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
    const iconUrlHotspring = require('~/assets/icons/hotspring.svg')
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
    // 温泉地ごとの酒蔵位置辞書の作成
    var hotspring_positions = [];
    hotsprings.results.bindings.map((hotspring) =>{
      if ('lat' in hotspring && 'value' in hotspring.lat && hotspring.lat.value !== null
          && 'long' in hotspring && 'value' in hotspring.long && hotspring.long.value !== null){
        hotspring_positions.push({
          "name": hotspring.name.value,
          "lat": parseFloat(hotspring.lat.value),
          "lng": parseFloat(hotspring.long.value),
          "iconUrl": iconUrlHotspring
        });
      }
    })
    this.$axios.post(
      '/api/locations/breweries',
      {
        locations: hotspring_positions
      }
    ).then((response) => {
      this.dict_hotsprings = {};
      console.log(response);
      Object.keys(response.data).forEach((key, index)=>{
        var locations = [];
        var breweries = response.data[key];
        if (breweries.length > 0){
          breweries.map((brewery)=>{
            locations.push({
              name: brewery.name,
              lat: brewery.latitude,
              lng: brewery.longitude,
              iconUrl: iconUrl
            })
          })
          locations.push(hotspring_positions[index]);
          this.dict_hotsprings[index] = locations;
        }
      })
      console.log(this.dict_hotsprings);
    });
  },
};
</script>

<style lang="scss" scoped>
#map {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
#map .marker-cluster {
  width: 20px !important;
  height: 20px !important;
  margin-top: −10px !important;
  margin-left: -10px !important;
  border-radius: 20px;
  div {
    width: 16px !important;
    height: 16px !important;
    margin-top: 2px;
    margin-left: 2px;

    border-radius: 16px;
    font-size: 12px;
  }
  span {
    line-height: 16px;
  }
  &.marker-cluster-small {
    background-color: var(--cluster-small);
    div {
      background-color: var(--cluster-small);
    }
  }
  &.marker-cluster-medium {
    background-color: var(--cluster-medium);
    div {
      background-color: var(--cluster-medium);
    }
  }
  &.marker-cluster-large {
    background-color: var(--cluster-large);
    div {
      background-color: var(--cluster-large);
    }
  }
}

/* IE 6-8 fallback colors */
#map .leaflet-oldie {
  .marker-cluster-small {
    background-color: var(--success);
    div {
      background-color: var(--success);
    }
  }
  .marker-cluster-medium {
    background-color: var(--warning);
    div {
      background-color: var(--warning);
    }
  }
  .marker-cluster-large {
    background-color: var(--danger);
    div {
      background-color: var(--danger);
    }
  }
}
</style>
