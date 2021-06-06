<template>
  <div>
    <h1>アカウント情報</h1>

    <hr />

    <div class="col-md-8 col-lg-4 mx-auto">
      <div class="card">
        <div class="card-body">
          <h4 class="text-center">
            <img :src="$store.state.user.avatarUrl" width="72" class="pr-2" />{{
              $store.state.user.name
            }}
          </h4>
          <div class="username form-group">
            <label for="">名前</label>
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
          <b-button variant="light" @click="save">保存</b-button>
        </div>
        <div class="card-footer">
          <b-button to="/auth/logout" variant="danger">Logout</b-button>
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
  },
};
</script>
