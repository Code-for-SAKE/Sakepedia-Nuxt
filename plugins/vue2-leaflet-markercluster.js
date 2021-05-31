import Vue from 'vue';
import * as L from 'leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
Vue.component('VMarkerCluster', Vue2LeafletMarkerCluster);

const LeafletPlugin = {
  install(Vue) {
    // Expose Leaflet
    Vue.prototype.$L = L;
  },
};

Vue.use(LeafletPlugin);
