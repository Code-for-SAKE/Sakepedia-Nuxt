<template>
  <div>
    <h1>酒蔵 更新</h1>
    <hr />

    <div class="row">
      <div class="col-md-6">
        <form action="" method="post" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="">法人番号</label>
            <input
              v-model="breweryId"
              type="text"
              inputmode="numeric"
              pattern="\d*"
              maxlength="13"
              placeholder="国税庁が指定する13桁の識別番号"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.breweryId }"
            />
            <div v-if="errors && errors.breweryId" class="invalid-feedback">
              {{ errors.breweryId.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">名前</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.name }"
            />
            <div v-if="errors && errors.name" class="invalid-feedback">
              {{ errors.name.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">ふりがな</label>
            <input
              v-model="kana"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.kana }"
            />
            <div v-if="errors && errors.kana" class="invalid-feedback">
              {{ errors.kana.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">都道府県</label>
            <select
              v-model="prefecture"
              class="custom-select"
              :class="{ 'is-invalid': errors && errors.prefecture }"
            >
              <option
                v-for="(item, index) in prefectures"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
            <div v-if="errors && errors.prefecture" class="invalid-feedback">
              {{ errors.prefecture.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">住所</label>
            <input
              v-model="address"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.address }"
            />
            <small
              >緯度経度は住所から自動的に登録されます。
              <a href="https://geolonia.com/">Geolonia</a>の<a
                href="https://github.com/geolonia/normalize-japanese-addresses"
                >住所正規化ライブラリ</a
              >を利用しています。<br />
              正確な緯度経度がわかる場合は入力してください。
            </small>
            <div v-if="errors && errors.address" class="invalid-feedback">
              {{ errors.address.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">緯度</label>
            <input
              v-model="latitude"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.latitude }"
            />
            <div v-if="errors && errors.latitude" class="invalid-feedback">
              {{ errors.latitude.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">経度</label>
            <input
              v-model="longitude"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.longitude }"
            />
            <div v-if="errors && errors.longitude" class="invalid-feedback">
              {{ errors.longitude.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Eメール</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
            />
            <div v-if="errors && errors.email" class="invalid-feedback">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">電話番号</label>
            <input
              v-model="tel"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.tel }"
            />
            <div v-if="errors && errors.tel" class="invalid-feedback">
              {{ errors.tel.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">FAX番号</label>
            <input
              v-model="fax"
              type="fax"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.fax }"
            />
            <div v-if="errors && errors.fax" class="invalid-feedback">
              {{ errors.fax.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">URL</label>
            <input
              v-model="url"
              type="url"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.url }"
            />
            <div v-if="errors && errors.url" class="invalid-feedback">
              {{ errors.url.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">購入URL</label>
            <input
              v-model="ecurl"
              type="url"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.ecurl }"
            />
            <div v-if="errors && errors.ecurl" class="invalid-feedback">
              {{ errors.ecurl.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Facebook</label>
            <input
              v-model="facebook"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.facebook }"
            />
            <div v-if="errors && errors.facebook" class="invalid-feedback">
              {{ errors.facebook.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Twitter</label>
            <input
              v-model="twitter"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.twitter }"
            />
            <div v-if="errors && errors.twitter" class="invalid-feedback">
              {{ errors.twitter.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Instagram</label>
            <input
              v-model="instagram"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.instagram }"
            />
            <div v-if="errors && errors.instagram" class="invalid-feedback">
              {{ errors.instagram.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">その他SNS</label>
            <input
              v-model="othersns"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.othersns }"
            />
            <div v-if="errors && errors.othersns" class="invalid-feedback">
              {{ errors.othersns.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">見学</label>
            <div class="form-check">
              <input
                id="hasVisit"
                v-model="hasVisit"
                type="checkbox"
                class="form-check-input"
              />
              <label for="hasVisit" class="form-check=label">あり</label>
            </div>
            <div v-if="hasVisit">
              <input
                v-model="visit"
                type="text"
                required="required"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.visit }"
              />
              <div class="form-control-sm">参加方法など</div>
              <div v-if="errors && errors.visit" class="invalid-feedback">
                {{ errors.visit.msg }}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="">試飲</label>
            <div class="form-check">
              <input
                id="hasTasting"
                v-model="hasTasting"
                type="checkbox"
                class="form-check-input"
              />
              <label for="hasTasting" class="form-check=label">あり</label>
            </div>
            <div v-if="hasTasting">
              <input
                v-model="tasting"
                type="text"
                required="required"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.tasting }"
              />
              <div class="form-control-sm">営業時間や定休日など</div>
              <div v-if="errors && errors.tasting" class="invalid-feedback">
                {{ errors.tasting.msg }}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="">併設カフェ</label>
            <div class="form-check">
              <input
                id="hasCafe"
                v-model="hasCafe"
                type="checkbox"
                class="form-check-input"
              />
              <label for="hasCafe" class="form-check=label">あり</label>
            </div>
            <div v-if="hasCafe">
              <input
                v-model="cafe"
                type="text"
                required="required"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.cafe }"
              />
              <div class="form-control-sm">営業時間や定休日など</div>
              <div v-if="errors && errors.cafe" class="invalid-feedback">
                {{ errors.cafe.msg }}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="">併設ショップ</label>
            <div class="form-check">
              <input
                id="hasShop"
                v-model="hasShop"
                type="checkbox"
                class="form-check-input"
              />
              <label for="hasShop" class="form-check=label">あり</label>
            </div>
            <div v-if="hasShop">
              <input
                v-model="shop"
                type="text"
                required="required"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.shop }"
              />
              <div class="form-control-sm">営業時間や定休日など</div>
              <div v-if="errors && errors.shop" class="invalid-feedback">
                {{ errors.shop.msg }}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="">日本酒以外の醸造・蒸留</label>
            <div class="form-check">
              <input
                id="hasOtherBrewing"
                v-model="hasOtherBrewing"
                type="checkbox"
                class="form-check-input"
              />
              <label for="hasOtherBrewing" class="form-check=label">あり</label>
            </div>
            <div v-if="hasOtherBrewing">
              <input
                v-model="otherBrewing"
                type="text"
                required="required"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.otherBrewing }"
              />
              <div
                v-if="errors && errors.otherBrewing"
                class="invalid-feedback"
              >
                {{ errors.visit.otherBrewing }}
              </div>
              <div v-else class="form-control-sm">種類など</div>
            </div>
          </div>

          <div class="form-group">
            <label for="">創業年</label>
            <input
              v-model="startYear"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.startYear }"
            />
            <div v-if="errors && errors.startYear" class="invalid-feedback">
              {{ errors.startYear.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">廃業年</label>
            <input
              v-model="endYear"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors && errors.endYear }"
            />
            <div v-if="errors && errors.endYear" class="invalid-feedback">
              {{ errors.endYear.msg }}
            </div>
          </div>

          <b-button variant="light" type="submit" class="mr-3">更新</b-button>
          <b-button :to="'/breweries/' + $route.params.id" class="mr-3"
            >キャンセル</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Prefectures = require('../../../utils/prefectures');
export default {
  middleware: ['authenticated'],

  async asyncData(context) {
    const { data } = await context.$axios.get(
      '/api/breweries/' + context.route.params.id
    );
    return {
      brewery: data,
    };
  },

  data() {
    return {
      errors: null,
      breweryId: null,
      name: null,
      kana: null,
      prefecture: null,
      address: null,
      latitude: null,
      longitude: null,
      email: null,
      tel: null,
      fax: null,
      url: null,
      ecurl: null,
      facebook: null,
      twitter: null,
      instagram: null,
      othersns: null,
      hasVisit: null,
      visit: null,
      hasTasting: null,
      tasting: null,
      hasCafe: null,
      cafe: null,
      hasShop: null,
      shop: null,
      hasOtherBrewing: null,
      otherBrewing: null,
      startYear: null,
      endYear: null,
      author: null,
      prefectures: Prefectures.prefectures,
    };
  },

  mounted() {
    this.fillFormData();
  },

  methods: {
    fillFormData() {
      this.breweryId = this.brewery.breweryId;
      this.name = this.brewery.name;
      this.kana = this.brewery.kana;
      this.prefecture = this.brewery.prefecture;
      this.address = this.brewery.address;
      this.latitude = this.brewery.latitude;
      this.longitude = this.brewery.longitude;
      this.email = this.brewery.email;
      this.tel = this.brewery.tel;
      this.fax = this.brewery.fax;
      this.url = this.brewery.url;
      this.ecurl = this.brewery.ecurl;
      this.facebook = this.brewery.facebook;
      this.twitter = this.brewery.twitter;
      this.instagram = this.brewery.instagram;
      this.othersns = this.brewery.othersns;
      this.hasVisit = !!this.brewery.visit;
      this.visit = this.brewery.visit;
      this.hasTasting = !!this.brewery.tasting;
      this.tasting = this.brewery.tasting;
      this.hasCafe = !!this.brewery.cafe;
      this.cafe = this.brewery.cafe;
      this.hasShop = !!this.brewery.shop;
      this.shop = this.brewery.shop;
      this.hasOtherBrewing = !!this.brewery.otherBrewing;
      this.otherBrewing = this.brewery.otherBrewing;
      this.startYear = this.brewery.startYear;
      this.endYear = this.brewery.endYear;
    },

    submitForm() {
      this.$axios
        .put('/api/breweries/' + this.$route.params.id, {
          breweryId: this.breweryId,
          name: this.name,
          kana: this.kana,
          prefecture: this.prefecture,
          address: this.address,
          latitude: this.latitude,
          longitude: this.longitude,
          email: this.email,
          tel: this.tel,
          fax: this.fax,
          url: this.url,
          ecurl: this.ecurl,
          facebook: this.facebook,
          twitter: this.twitter,
          instagram: this.instagram,
          othersns: this.othersns,
          hasVisit: this.hasVisit,
          visit: this.visit,
          hasTasting: this.hasTasting,
          tasting: this.tasting,
          hasCafe: this.hasCafe,
          cafe: this.cafe,
          hasShop: this.hasShop,
          shop: this.shop,
          hasOtherBrewing: this.hasOtherBrewing,
          otherBrewing: this.otherBrewing,
          startYear: this.startYear,
          endYear: this.endYear,
        })
        .then((response) => {
          console.log(response);

          if (response.data._id) {
            this.$router.push({
              name: 'breweries-id',
              params: { id: this.$route.params.id },
            });
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
