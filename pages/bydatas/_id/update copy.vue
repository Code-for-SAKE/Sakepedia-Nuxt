<template>
  <div>
    <h1>日本酒 更新</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">名前</label>
            <input
              v-model="sake.name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
            />
            <div v-if="errors && errors.name" class="invalid-feedback">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">銘柄名</label>
            <input
              v-model="sake.brand"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.brand }"
            />
            <div v-if="errors && errors.brand" class="invalid-feedback">
              {{ errors.brand.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">酒蔵</label>
            <brewery-select
              ref="brewery_search"
              v-model="brewery"
              :class="{ 'is-invalid': errors && errors.brewery }"
            />
            <div v-if="errors && errors.brewery" class="invalid-feedback">
              {{ errors.brewery.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">副題</label>
            <input
              v-model="sake.subname"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.subname }"
            />
            <div v-if="errors && errors.subname" class="invalid-feedback">
              {{ errors.subname.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">分類</label>
            <input
              v-model="sake.type"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.type }"
            />
            <div v-if="errors && errors.type" class="invalid-feedback">
              {{ errors.type.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">アミノ酸度</label>
            <div>
              <input
                v-model="sake.aminoAcidContent[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.aminoAcidContent }"
              />
              〜
              <input
                v-model="sake.aminoAcidContent[1]"
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
                v-model="sake.alcoholContent[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.alcoholContent }"
              />
              〜
              <input
                v-model="sake.alcoholContent[1]"
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
                v-model="sake.sakeMeterValue[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.sakeMeterValue }"
              />
              〜
              <input
                v-model="sake.sakeMeterValue[1]"
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
                v-model="sake.acidity[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.acidity }"
              />
              〜
              <input
                v-model="sake.acidity[1]"
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
                v-model="sake.ricePolishingRate[0]"
                type="number"
                class="form-control col-md-3 d-inline-block"
                step="0.01"
                :class="{ 'is-invalid': errors && errors.ricePolishingRate }"
              />
              〜
              <input
                v-model="sake.ricePolishingRate[1]"
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
              v-model="sake.sakeYeast"
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
              v-model="sake.riceForMakingKoji"
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
              v-model="sake.sakeRiceExceptForKojiMaking"
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
            <label for="">内容量</label>
            <input
              v-model="sake.volume"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.volume }"
            />
            <div v-if="errors && errors.volume" class="invalid-feedback">
              {{ errors.volume.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">金額</label>
            <input
              v-model="sake.price"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.price }"
            />
            <div v-if="errors && errors.price" class="invalid-feedback">
              {{ errors.price.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">受賞歴</label>
            <textarea
              v-model="sake.award"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.award }"
            ></textarea>
            <div v-if="errors && errors.award" class="invalid-feedback">
              {{ errors.award.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">説明</label>
            <textarea
              v-model="sake.escription"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.description }"
            ></textarea>
            <div v-if="errors && errors.description" class="invalid-feedback">
              {{ errors.description.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">URL</label>
            <input
              v-model="sake.url"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
            />
            <div v-if="errors && errors.url" class="invalid-feedback">
              {{ errors.url.msg }}
            </div>
          </div>

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/sakes/' + $route.params.id" class="mr-3"
            >キャンセル</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BrewerySelect from "@/components/BrewerySelect.vue";
export default {
  components: {
    BrewerySelect,
  },
  middleware: ["authenticated"],

  async asyncData(context) {
    const { data } = await context.$axios.get(
      "/api/sakes/" + context.route.params.id
    );
    return {
      sake: data,
      brewery: { name: data.brewery },
    };
  },

  data() {
    return {
      errors: null,
      searchedBreweries: [],
    };
  },

  methods: {
    submitForm() {
      this.sake.brewery = this.brewery.name;
      this.$axios
        .put("/api/sakes/" + this.$route.params.id, this.sake)
        .then((response) => {
          if (response.data._id) {
            this.$store.dispatch("flash/show", {
              text: "更新しました",
              mode: "alert-success",
            });
            this.$router.push({
              name: "sakes-id",
              params: { updated: "yes", id: this.$route.params.id },
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
