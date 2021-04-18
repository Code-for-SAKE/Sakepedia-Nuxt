<template>
  <div>
    <h1>醸造データ 更新</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <h3>{{ bydata.sake.name }}</h3>
          <div class="form-group">
            <label for="">醸造年</label>
            <input
              v-model="bydata.makedBY"
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
                v-model="bydata.aminoAcidContent[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
              />
              〜
              <input
                v-model="bydata.aminoAcidContent[1]"
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
                v-model="bydata.alcoholContent[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
              />
              〜
              <input
                v-model="bydata.alcoholContent[1]"
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
                v-model="bydata.sakeMeterValue[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
              />
              〜
              <input
                v-model="bydata.sakeMeterValue[1]"
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
                v-model="bydata.acidity[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
              />
              〜
              <input
                v-model="bydata.acidity[1]"
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
                v-model="bydata.ricePolishingRate[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
              />
              〜
              <input
                v-model="bydata.ricePolishingRate[1]"
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
              v-model="bydata.sakeYeast"
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
              v-model="bydata.riceForMakingKoji"
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
              v-model="bydata.sakeRiceExceptForKojiMaking"
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
              v-model="bydata.bottledDate"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.bottledDate }"
            />
            <div v-if="errors && errors.bottledDate" class="invalid-feedback">
              {{ errors.bottledDate.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/bydatas/' + $route.params.id" class="mr-3"
            >キャンセル</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  middleware: ['authenticated'],

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/bydatas/' + context.route.params.id
    );
    return {
      bydata: data,
    };
  },

  data() {
    return {
      errors: null,
    };
  },

  methods: {
    submitForm() {
      this.$axios
        .put('/api/bydatas/' + this.$route.params.id, this.bydata)
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch('flash/show', {
              text: '更新しました',
              mode: 'alert-success',
            });
            this.$router.push({
              name: 'bydatas-id',
              params: { updated: 'yes', id: this.$route.params.id },
            });
          }
        })
        .catch((error) => {
          if (error) {
            this.errors = error;
          }
        });
    },
  },
};
</script>
