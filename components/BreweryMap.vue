<template>
  <client-only>
    <div id="map">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="[brewery.latitude, brewery.longitude]"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="[brewery.latitude, brewery.longitude]">
          <l-popup :content="`${brewery.name}`"></l-popup>
        </l-marker>
        <l-control position="bottomleft">
          <b-alert v-if="locationError" variant="danger" show>
            {{ locationError }}
          </b-alert>
        </l-control>
      </l-map>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    brewery: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      zoom: 10,
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      locationError: null,
      locationLoading: false,
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
#map .control-btn {
  display: block;
}
</style>
