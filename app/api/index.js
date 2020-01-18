import http from 'http'
import { ApolloServer } from 'apollo-server-express'
// import { AuthenticationError } from 'apollo-server'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import jwt from 'express-jwt'
import cors from 'cors'
import helmet from 'helmet'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity'
// import { graphqlUploadExpress } from 'graphql-upload'
import { getClientIp } from 'api/utils/request'
// import { getJWT } from 'api/utils/jwt'
import { resolvers, typeDefs } from 'api/graphql/schema'
import schemaDirectives from 'api/utils/directives'
import { formatError } from 'api/utils/errors'
// import createLoaders from 'api/graphql/loaders'
import i18n, { e } from 'api/utils/localize'

const LIMIT_QUERY_DEPT = 10
const LIMIT_QUERY_COMPLEXITY = 5000
const LIMIT_QUERY_SIZE = 2000
const PORT = parseInt(process.env.APP_PORT, 10) || 3000
const IS_DEV = process.env.APP_ENV !== 'production'

const app = express()

app.enable('trust proxy')
app.use(
  helmet(),
  cors({
    origin: process.env.CORS_ORIGINS.split(','),
    optionsSuccessStatus: 200,
  }),
  compression(),
  jwt({
    secret: process.env.JWT_KEY,
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    if (err.code === 'invalid_token') {
      return next()
    }

    return next(err)
  },
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  formatError,
  playground: IS_DEV,
  debug: IS_DEV,
  tracing: IS_DEV,
  validationRules: [
    depthLimit(LIMIT_QUERY_DEPT),
    createComplexityLimitRule(LIMIT_QUERY_COMPLEXITY, {
      formatErrorMessage: cost =>
        `The cost of query exceeds the complexity limit - ${cost}/${LIMIT_QUERY_COMPLEXITY}`,
    }),
  ],
  context: ({ res, req, connection }) => {
    if (connection) {
      return connection.context
    }

    const authToken = req.user || {}
    // const loaders = createLoaders(authToken)

    if (
      (req.headers['x-locale'] && req.headers['x-locale'] === 'th') ||
      req.headers['x-locale'] === 'en'
    ) {
      i18n.setLocale(req.headers['x-locale'])
    }

    const { query = '' } = req.body
    if (query.length > LIMIT_QUERY_SIZE) {
      res.status(400).send('400, Bad Request')
    }

    return {
      authToken,
      // loaders,
      userAgent: req.headers['user-agent'],
      clientIp: getClientIp(req),
      getAuthToken: () => req.user || {},
    }
  },
  // subscriptions: {
  //   onConnect(connectionParams) {
  //     console.log('onConnect')
  //     let authToken = {}
  //     if (connectionParams.authorization != null) {
  //       authToken = getJWT(connectionParams.authorization.replace('Bearer ', ''))
  //       return {
  //         authToken,
  //       }
  //     }

  //     throw new AuthenticationError(e('You are not allowed to access this data'))
  //   },
  //   onDisconnect() {
  //     console.log('onDisconnect')
  //   },
  // },
})

server.applyMiddleware({ app })

app.get('/health', (_, res) => {
  res.status(200).send(`OK`)
})

app.use((_, res) => {
  res.status(404).send("404, This path doesn't exist!")
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: e('Authentication token is wrong'),
    })
  }
})

const httpServer = http.createServer(app)

// server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, err => {
  if (err) {
    throw err
  }
  console.log(`🚀 Server ready at :${PORT}${server.graphqlPath}`)
})
