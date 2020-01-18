import jwtDecode from 'jwt-decode'

export default ({ app, store }) => {
  // eslint-disable-line prettier/prettier
  const token = app.$apolloHelpers.getToken()

  if (token) {
    const auth = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)

    if (now > auth.exp) {
      app.$cookies.remove('test-token')
      store.commit('auth/logout')
      store.commit('auth/isAuth', false)
    } else {
      store.commit('auth/login', auth)
      store.commit('auth/isAuth', true)
    }
  }
}
