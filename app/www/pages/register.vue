<template>
  <div class="login-form">
    <div class="body">
      <ApolloMutation
        :mutation="registerWithEmailGQL"
        :variables="{ input: registerWithEmailVariables }"
        v-on="{ error: errorHandler('registerWithEmailErrorStates') }"
        @done="onregisterWithEmailSuccess"
        @loading="onregisterWithEmailLoading"
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
                v-model="registerWithEmailVariables.firstName"
                :error="registerWithEmailErrorStates.firstName"
                name="firstName"
                type="text"
                placeholder="firstName"
                variant="block"
              />
            </div>
            <div class="form-input">
              <Input
                v-model="registerWithEmailVariables.lastName"
                :error="registerWithEmailErrorStates.lastName"
                name="lastName"
                type="text"
                placeholder="lastName"
                variant="block"
              />
            </div>
            <div class="form-input">
              <Input
                v-model="registerWithEmailVariables.email"
                :error="registerWithEmailErrorStates.email"
                name="email"
                type="text"
                placeholder="Email"
                variant="block"
              />
            </div>
            <div class="form-input">
              <Input
                v-model="registerWithEmailVariables.password"
                :error="registerWithEmailErrorStates.password"
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
            <div v-if="registerWithEmailErrorStates['_error']" class="general-error">
              {{ registerWithEmailErrorStates._error }}
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
import { registerWithEmail } from '~/graphql/login/email'

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
      wellCome: 'Register',
      registerWithEmailVariables: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      registerWithEmailErrorStates: {},
      registerWithEmailGQL: registerWithEmail,
    }
  },
  methods: {
    onregisterWithEmailSuccess({ data }) {
      this.$router.push('/')
    },
    onregisterWithEmailLoading(isLoading) {
      if (isLoading) {
        this.registerWithEmailErrorStates = {}
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
