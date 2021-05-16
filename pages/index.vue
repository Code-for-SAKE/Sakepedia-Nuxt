<template>
  <div>
    <!-- <h1>Sakepedia Nuxt版</h1>
    <hr /> -->
    <div class="row">
      <div class="col-sm-4">
        <h3>日本酒オープンデータを作る</h3>
        <ul>
          <li>日本酒の情報をWikipediaのようにみんなで更新、公開します。</li>
          <li>Sakepediaの更新が終わってしまったので、Nuxtで作り直しました。</li>
          <li>酒蔵と銘柄のデータを公開します。</li>
          <li>検索、追加、編集ができます。</li>
          <li>APIでも取得できます。</li>
        </ul>
      </div>
      <div id="map" class="col-sm-8">
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
