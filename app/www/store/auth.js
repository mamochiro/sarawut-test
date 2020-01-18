export const state = () => ({
  auth: {},
  isAuth: false,
})

export const mutations = {
  login(state, auth) {
    state.auth = auth
  },
  logout(state) {
    state.auth = {}
  },
  isAuth(state, isAuth) {
    state.isAuth = isAuth
  },
}
