export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~assets/scss/main.scss', 'element-ui/lib/theme-chalk/index.css'],
  /*
   ** Style resources
   */
  styleResources: {
    scss: ['~assets/scss/main.scss'],
  },
  /*
   ** Environment variables injection
   */
  env: {
    APP_HOST: process.env.APP_HOST || 'http://localhost:8000',
    API_HOST: process.env.API_HOST || 'http://localhost:3000/graphql',
    DOMAIN: process.env.DOMAIN || 'localhost',
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/apollo', '@nuxtjs/eslint-module', '@nuxtjs/style-resources'],
  /*
   ** Apollo configuration
   */
  apollo: {
    tokenName: 'test-token',
    cookieAttributes: {
      expires: 356,
      domain: process.env.DOMAIN,
    },
    // errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'network-only',
      },
    },
  },

  router: {
    middleware: ['get-auth'],
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
