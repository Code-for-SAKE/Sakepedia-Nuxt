<template>
  <div>
    <!-- <h1>Sakepedia Nuxt版</h1>
    <hr /> -->
    <div class="row">
      <div class="col-12 my-3">
        <!-- List group -->
        <div>
          <h3>酒蔵マップ</h3>
          <b-card no-body>
            <b-tabs
              pills
              card
              fill
              lazy
              :vertical="isVertical"
              :nav-wrapper-class="isVertical ? 'col-md-4' : 'map-tab'"
              :content-class="isVertical ? 'col-md-8' : ''"
            >
              <b-tab title="都道府県別の酒蔵" active>
                <div class="map-wrap">
                  <breweries-map />
                </div>
              </b-tab>
              <b-tab title="温泉近くの酒蔵">
                <div class="map-wrap">Comming Soon...</div>
              </b-tab>
              <b-tab title="自然の中の酒蔵">
                <div class="map-wrap">Comming Soon...</div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
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
  data() {
    return {
      isVertical: false,
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize: function () {
      if (window.innerWidth <= 800) {
        this.isVertical = false;
      } else {
        this.isVertical = true;
      }
    },
  },
};
</script>

<style>
.map-wrap {
  height: 45vh;
  width: 100%;
  text-align: center;
}
.map-tab {
  min-height: 4.5rem;
}
</style>
