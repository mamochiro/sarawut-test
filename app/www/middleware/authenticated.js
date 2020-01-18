import jwtDecode from 'jwt-decode'

export default ({ store, redirect, route, app }) => {
  if (!store.state.auth.isAuth) {
    // return redirect('/login')
    return redirect(`/login?redirect=${route.fullPath}`)
  }

  const token = app.$apolloHelpers.getToken()
  if (token) {
    const auth = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)

    if (now > auth.exp) {
      app.$cookies.remove('test-token')
      store.commit('auth/logout')
      store.commit('auth/isAuth', false)
      return redirect(`/login?redirect=${route.fullPath}`)
    }
  }
}
