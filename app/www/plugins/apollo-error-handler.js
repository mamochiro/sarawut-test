import { get, isEmpty, chain, groupBy } from 'lodash'

export default {
  methods: {
    errorHandler(stateKey) {
      return (error, context) => {
        // eslint-disable-line
        const graphQLErrors = get(error, 'graphQLErrors', {})
        const networkError = get(error, 'networkError', {})
        const unknownError = get(error, 'message', 'เกิดข้อผิดพลาด')

        if (!isEmpty(graphQLErrors)) {
          const states = get(error, 'graphQLErrors.0.states', [])

          if (!isEmpty(states)) {
            if (Object.prototype.hasOwnProperty.call(states[0], 'index')) {
              const errors = groupBy(states, 'key')
              this[stateKey] = errors
              return
            }
            const errors = chain(states)
              .keyBy('key')
              .mapValues('message')
              .value()

            this[stateKey] = errors
            return
          }

          const message = get(error, 'graphQLErrors.0.message', [])

          if (!isEmpty(message)) {
            this[stateKey] = {
              _error: message,
            }
            return
          }
        }

        if (!isEmpty(networkError)) {
          switch (networkError.statusCode) {
            case 401:
              this.$apolloHelpers.onLogout()
              this.$store.commit('auth/logout')
              this.$store.commit('auth/isAuth', false)
              this.$store.commit('auth/setSession', true)
              this.$router.push(`/login?redirect=${this.$route.path}`)
              this.$emit('close')
              break

            case 403:
              this[stateKey] = {
                _error: networkError.name,
              }
              break

            default:
              this[stateKey] = {
                _error: networkError.name,
              }
              break
          }
          return
        }

        this[stateKey] = {
          _error: unknownError,
        }
      }
    },
  },
}
