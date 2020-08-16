<template>
  <p>callback. Please Wait</p>
</template>

<script>
export default {
  data() {
    return {
      user: null
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/auth/callback', {
      params: this.$route.query
    })
    const user = {
      id: res.data.user.id,
      name: res.data.user.username,
      avatarUrl: res.data.user.photos[0].value
    }
    this.$store.commit('login', user)
    this.$router.push('/auth/account')
  }
}
</script>