<template>
  <div class="container logging-out">
    Logout...
  </div>
</template>

<script>
export default {
  mounted() {
    this.$apolloHelpers.onLogout('test-token')
    this.$store.commit('auth/logout')
    this.$store.commit('auth/isAuth', false)
    this.$router.push('/')
  },
}
</script>

<style>
.logging-out {
  text-align: center;
  color: #fff;
  padding: 200px 0;
  font-size: 24px;
}
</style>
