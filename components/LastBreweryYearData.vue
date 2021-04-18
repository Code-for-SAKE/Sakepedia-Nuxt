<template>
  <div class="bydata">
    <div v-if="bydata">
      <h4>{{ bydata.makedBY }}年</h4>
      <h6>By {{ bydata.author }} {{ bydata.modifiedAt | datetime }}</h6>
      <dl>
        <dt>アミノ酸度</dt>
        <dd><range-value :values="bydata.aminoAcidContent" /></dd>
        <dt>アルコール度</dt>
        <dd><range-value :values="bydata.alcoholContent" /></dd>
        <dt>日本酒度</dt>
        <dd><range-value :values="bydata.sakeMeterValue" /></dd>
        <dt>酸度</dt>
        <dd><range-value :values="bydata.acidity" /></dd>
        <dt>精米歩合</dt>
        <dd><range-value :values="bydata.ricePolishingRate" /></dd>
        <dt>酵母</dt>
        <dd>{{ bydata.sakeYeast }}</dd>
        <dt>麹米</dt>
        <dd>{{ bydata.riceForMakingKoji }}</dd>
        <dt>掛米</dt>
        <dd>{{ bydata.sakeRiceExceptForKojiMaking }}</dd>
        <dt>製造年月(日)</dt>
        <dd>{{ bydata.bottledDate | date }}</dd>
      </dl>
      <hr />
      <div class="d-flex justify-content-between">
        <div>
          <b-button
            variant="primary"
            :to="'/bydatas/' + bydata._id + '/update'"
            class="mr-3"
            >編集</b-button
          >
          <b-button variant="danger" @click="deleteRecord()">削除</b-button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">データがありません</div>
  </div>
</template>

<script>
import RangeValue from '@/components/RangeValue.vue';

export default {
  components: {
    RangeValue,
  },
  props: {
    sake: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bydata: null,
    };
  },
  mounted() {
    //初期値の設定
    if (this.sake) {
      this.$axios
        .get('/api/bydatas/', { params: { sake: this.sake, limit: 1 } })
        .then((response) => {
          this.bydata = response.data.bydatas[0];
        });
    }
  },
  methods: {
    deleteRecord() {
      if (confirm('Are you sure?') === true) {
        this.$axios
          .delete('/api/bydatas/' + bydata._id)
          .then((response) => {
            if (response.data._id) {
              this.$router.push({
                name: 'bydatas',
                params: { deleted: 'yes' },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
