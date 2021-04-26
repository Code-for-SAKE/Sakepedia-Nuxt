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
            <label for="">フリガナ</label>
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

          <b-button variant="primary" type="submit" class="mr-3">更新</b-button>
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
      url: null,
      ecurl: null,
      facebook: null,
      twitter: null,
      instagram: null,
      othersns: null,
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
      this.url = this.brewery.url;
      this.ecurl = this.brewery.ecurl;
      this.facebook = this.brewery.facebook;
      this.twitter = this.brewery.twitter;
      this.instagram = this.brewery.instagram;
      this.othersns = this.brewery.othersns;
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
          url: this.url,
          ecurl: this.ecurl,
          facebook: this.facebook,
          twitter: this.twitter,
          instagram: this.instagram,
          othersns: this.othersns,
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
