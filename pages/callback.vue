<template>
  <p>callback. Please Wait</p>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    const res = await this.$axios.get('/api/auth/callback', {
      params: this.$route.query,
    });
    const user = {
      _id: res.data.user._id,
      name: res.data.user.name,
      avatarUrl: res.data.user.avatarUrl,
    };
    this.$store.commit('login', user);
    this.$router.push('/auth/account');
  },
};
</script>
