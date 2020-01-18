<template>
  <div class="login-form">
    <div class="body">
      <ApolloMutation
        :mutation="loginWithEmailGQL"
        :variables="{ input: loginWithEmailVariables }"
        v-on="{ error: errorHandler('loginWithEmailErrorStates') }"
        @done="onLoginWithEmailSuccess"
        @loading="onLoginWithEmailLoading"
      >
        <template v-slot="{ mutate, loading }">
          <form method="POST" @submit.prevent="mutate()">
            <div class="head">
              <!-- <img class="logo" src="~assets/images/logo.png" /> -->
              <h2>
                {{ wellCome }}
              </h2>
            </div>
            <div class="form-input">
              <Input
                v-model="loginWithEmailVariables.email"
                :error="loginWithEmailErrorStates.email"
                name="email"
                type="text"
                placeholder="Email"
                variant="block"
              />
            </div>
            <div class="form-input">
              <Input
                v-model="loginWithEmailVariables.password"
                :error="loginWithEmailErrorStates.password"
                name="password"
                type="password"
                placeholder="password"
                variant="block"
              />
            </div>
            <div class="form-btn">
              <Button type="submit" :disabled="loading" variant="block signin">
                Sign In
              </Button>
            </div>
            <div v-if="loginWithEmailErrorStates['_error']" class="general-error">
              {{ loginWithEmailErrorStates._error }}
            </div>
          </form>
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>
<script>
import Input from '~/components/common/Input'
import Button from '~/components/common/Button'
import errorHandler from '~/plugins/apollo-error-handler'
import { loginWithEmail } from '~/graphql/login/email'

export default {
  components: {
    Input,
    Button,
  },
  mixins: [errorHandler],
  asyncData({ store, query, redirect }) {
    if (store.state.auth.isAuth) {
      redirect(query.redirect || '/')
    }
  },
  data() {
    return {
      wellCome: 'Sign In',
      loginWithEmailVariables: {
        email: '',
        password: '',
      },
      loginWithEmailErrorStates: {},
      loginWithEmailGQL: loginWithEmail,
    }
  },
  methods: {
    async onLoginWithEmailSuccess({ data }) {
      const { id } = data.loginWithEmail
      await this.$apolloHelpers.onLogin(id)

      this.$router.push('/')
    },
    onLoginWithEmailLoading(isLoading) {
      if (isLoading) {
        this.loginWithEmailErrorStates = {}
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.login-form {
  margin: 40px 40px 10px 40px;
  font-family: $kanit;
  .head {
    text-align: center;
    .logo {
      margin-bottom: 20px;
    }
    h2 {
      font-weight: 700;
      font-size: 30px;
      color: #000;
      text-align: center;
    }
  }
  .form-input {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .tagline {
    text-align: center;
    margin-top: 10px;
  }
  .login-email {
    margin-top: 20px;
    .login-email-options {
      padding: 5px 15px;
      color: #adadad;
      font-size: 12px;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
      a {
        color: #adadad;
        text-decoration: none;
      }
    }
  }
  .form-line {
    padding-top: 15px;
  }
  .line {
    position: relative;
    text-align: center;
    height: 30px;
    margin: 30px 0 15px;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0;
      border-top: 1px solid #707070;
      top: 50%;
      left: 0;
      z-index: 1;
    }
    span {
      display: inline-block;
      background-color: #fff;
      z-index: 2;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -12px;
      margin-left: -20px;
      padding: 0 10px;
    }
  }

  .general-error {
    color: red;
    text-align: center;
    padding: 5px;
    margin-top: 10px;
  }
}
</style>
