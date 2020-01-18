<template>
  <div class="container">
    <div>
      <div v-if="isAuth">
        <el-row> Wellcome : {{ auth.data.firstName }} </el-row>
        <el-row>
          <a href="/list">
            <el-button type="primary">List</el-button>
          </a>

          <n-link to="/logout">
            <el-button type="warning">Log Out</el-button>
          </n-link>
        </el-row>
      </div>
      <div v-else>
        <el-row>
          Wellcome
        </el-row>
        <el-row>
          <n-link to="/login">
            <el-button type="primary" plain>Log in</el-button>
          </n-link>
          <n-link to="/register">
            <el-button type="success" plain>Register</el-button>
          </n-link>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo,
  },
  computed: {
    auth() {
      return this.$store.state.auth.auth
    },
    isAuth() {
      return this.$store.state.auth.isAuth
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.el-row {
  margin-bottom: 20px;
}
</style>
