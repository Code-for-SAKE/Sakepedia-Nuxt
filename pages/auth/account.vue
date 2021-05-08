<template>
  <div>
    <h1>アカウント情報</h1>

    <hr />

    <div class="card col-4 mx-auto text-center">
      <div class="card-body">
        <h4>
          <img :src="$store.state.user.avatarUrl" width="72" class="mx-3" />{{
            $store.state.user.name
          }}
        </h4>

        <b-button to="/auth/logout" variant="danger">Logout</b-button>
        <div class="username">
          <div class="error-message">{{ errorMessage }}</div>
          <label for="name"> 名前: </label>
          <input v-model="name" id="name" type="text" @keypress.enter="save" />
          <input type="submit" value="保存" @click="save" />
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
            this.errorMessage = ''
            this.$store.commit('login', res.data.user);
          }
        });
    },
  },
};
</script>
