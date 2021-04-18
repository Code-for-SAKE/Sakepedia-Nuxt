<template>
  <div>
    <h1>日本酒醸造データ 追加</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">日本酒</label>
            <sake-select
              ref="sake_search"
              v-model="sake"
              :class="{ 'is-invalid': errors && errors.sake }"
            />
            <div v-if="errors && errors.sake" class="invalid-feedback">
              {{ errors.sake.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">醸造年</label>
            <input
              v-model="makedBY"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.makedBY }"
            />
            <div v-if="errors && errors.makedBY" class="invalid-feedback">
              {{ errors.makedBY.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input
                v-model="aminoAcidContentMin"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
              />
              〜
              <input
                v-model="aminoAcidContentMax"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
              />
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div
              v-if="errors && errors.aminoAcidContent"
              class="invalid-feedback"
            >
              {{ errors.aminoAcidContent.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アルコール度</label>
            <div>
              <input
                v-model="alcoholContentMin"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
              />
              〜
              <input
                v-model="alcoholContentMax"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
              />
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div
              v-if="errors && errors.alcoholContent"
              class="invalid-feedback"
            >
              {{ errors.alcoholContent.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">日本酒度</label>
            <div>
              <input
                v-model="sakeMeterValueMin"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
              />
              〜
              <input
                v-model="sakeMeterValueMax"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
              />
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div
              v-if="errors && errors.sakeMeterValue"
              class="invalid-feedback"
            >
              {{ errors.sakeMeterValue.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酸度</label>
            <div>
              <input
                v-model="acidityMin"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
              />
              〜
              <input
                v-model="acidityMax"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
              />
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div v-if="errors && errors.acidity" class="invalid-feedback">
              {{ errors.acidity.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">精米歩合</label>
            <div>
              <input
                v-model="ricePolishingRateMin"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
              />
              〜
              <input
                v-model="ricePolishingRateMax"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
              />
            </div>
            <small>範囲が必要ない場合は左側のみ</small>
            <div
              v-if="errors && errors.ricePolishingRate"
              class="invalid-feedback"
            >
              {{ errors.ricePolishingRate.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酵母</label>
            <input
              v-model="sakeYeast"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.sakeYeast }"
            />
            <div v-if="errors && errors.sakeYeast" class="invalid-feedback">
              {{ errors.sakeYeast.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">麹米</label>
            <input
              v-model="riceForMakingKoji"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.riceForMakingKoji }"
            />
            <div
              v-if="errors && errors.riceForMakingKoji"
              class="invalid-feedback"
            >
              {{ errors.riceForMakingKoji.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">掛米</label>
            <input
              v-model="sakeRiceExceptForKojiMaking"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': errors && errors.sakeRiceExceptForKojiMaking,
              }"
            />
            <div
              v-if="errors && errors.sakeRiceExceptForKojiMaking"
              class="invalid-feedback"
            >
              {{ errors.sakeRiceExceptForKojiMaking.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">製造年月日</label>
            <input
              v-model="bottledDate"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.bottledDate }"
            />
            <div v-if="errors && errors.bottledDate" class="invalid-feedback">
              {{ errors.bottledDate.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">追加</b-button>
          <b-button to="/bydatas" class="mr-3">キャンセル</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SakeSelect from "@/components/SakeSelect.vue";
export default {
  components: {
    SakeSelect,
  },
  middleware: ["authenticated"],
  async asyncData(context) {
    if (context.route.query.sake) {
      const { data } = await context.$axios.get(
        "/api/sakes/" + context.route.query.sake
      );
      return {
        brand: data.brand,
        brewery: data.brewery,
        sake: data,
      };
    }
  },
  data() {
    return {
      errors: null,
      sake: null,
      makedBY: null,
      aminoAcidContentMin: null,
      aminoAcidContentMax: null,
      alcoholContentMin: null,
      alcoholContentMax: null,
      sakeMeterValueMin: null,
      sakeMeterValueMax: null,
      acidityMin: null,
      acidityMax: null,
      ricePolishingRateMin: null,
      ricePolishingRateMax: null,
      sakeYeast: null,
      riceForMakingKoji: null,
      sakeRiceExceptForKojiMaking: null,
      bottledDate: null,
    };
  },
  methods: {
    submitForm() {
      this.$axios
        .post("/api/bydatas", {
          sake: this.sake,
          makedBY: this.makedBY,
          aminoAcidContent: [
            this.aminoAcidContentMin,
            this.aminoAcidContentMax,
          ],
          alcoholContent: [this.alcoholContentMin, this.alcoholContentMax],
          sakeMeterValue: [this.sakeMeterValueMin, this.sakeMeterValueMax],
          acidity: [this.acidityMin, this.acidityMax],
          ricePolishingRate: [
            this.ricePolishingRateMin,
            this.ricePolishingRateMax,
          ],
          sakeYeast: this.sakeYeast,
          riceForMakingKoji: this.riceForMakingKoji,
          sakeRiceExceptForKojiMaking: this.sakeRiceExceptForKojiMaking,
          bottledDate: this.bottledDate,
        })
        .then((response) => {
          if (response.data._id) {
            this.$router.push({ name: "bydatas", params: { created: "yes" } });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
