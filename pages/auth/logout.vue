<template>
  <div>
    <h1>Logging out</h1>
    <hr />

    <p>Please wait...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios
      .get('/api/auth/logout')
      .then((response) => {
        this.$store.commit('logout');
        this.$router.push({ path: '/auth/login' });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
