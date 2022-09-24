<template>
  <div>
    <h1>アカウント情報</h1>

    <hr />

    <div class="col-md-8 col-lg-4 mx-auto">
      <div class="card">
        <div class="card-body">
          <h4 class="text-center">
            <img :src="$store.state.user.avatarUrl" width="72" class="pr-2" />
            <p>{{ $store.state.user.name }}</p>
            <p>{{ $store.state.user.message }}</p>
          </h4>
          <div class="username form-group">
            <label for="name">新しい名前</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errorMessage }"
              @keypress.enter="save"
            />
            <div v-if="errorMessage" class="invalid-feedback">
              {{ errorMessage }}
            </div>
          </div>
          <b-button variant="light" @click="save">更新</b-button>
        </div>
        <div class="card-footer">
          <b-button to="/auth/logout" variant="danger">Logout</b-button>
        </div>
      </div>
      <div class="card my-3">
        <div class="card-body">
          <p>
            登録APIなどで利用できるJWTを発行できます。<br />ボタンを押せばクリップボードにコピーにされます。
          </p>
          <b-button variant="primary" @click="getJwt">JWT取得</b-button
          ><span v-if="jwtExpires" class="mx-3">{{ jwtExpires }}まで有効</span>
          <p v-if="jwToken" class="jwt alert alert-dark m-3">{{ jwToken }}</p>
          <p v-if="jwToken">
            利用方法の例: curl -H "authorization: Bearer [JWT]" [URL]
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      name: '',
      errorMessage: '',
      jwToken: '',
      jwtExpires: '',
    };
  },
  methods: {
    async save() {
      await this.$axios
        .post(`api/users/${this.$store.state.user._id}/name`, {
          name: this.name,
        })
        .then((res) => {
          if (res.data.error) {
            this.errorMessage = res.data.error;
          } else {
            this.errorMessage = '';
            this.$store.commit('login', res.data.user);
          }
        });
    },
    async getJwt() {
      await this.$axios
        .get(`api/users/${this.$store.state.user._id}/jwt`)
        .then((res) => {
          if (res.data.error) {
            this.jwToken = res.data.error;
          } else {
            this.jwToken = res.data.jwt;
            this.jwtExpires = this.$moment(res.data.expiresIn).format(
              'YYYY-MM-DD H:m:s'
            );
            this.$copyText(res.data.jwt);
          }
        });
    },
  },
};
</script>
