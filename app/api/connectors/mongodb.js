import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate'
import { get } from 'lodash'
import { ApolloError } from 'apollo-server'
import { e } from 'api/utils/localize'
import { INTERNAL_SERVER_ERROR } from 'api/utils/errors'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

class MongoDB {
  constructor(config) {
    this.config = config
    this.connections = {}
  }

  create(service, database) {
    let connection = get(this.connections, `${service}.${database}`, false)
    if (!connection) {
      connection = mongoose.createConnection(`${this.config.uri}`, {
        dbName: database,
        ...this.config.options,
      })
      this.connections[`${service}.${database}`] = connection
    }

    return connection
  }

  connect({ service, database, collection, schema }) {
    const connection = this.create(service, database)
    connection.plugin(mongoosePaginate)
    connection.plugin(mongooseAggregatePaginate)
    return connection.models[collection] || connection.model(collection, schema)
  }
}

let instance
export const initiate = () => {
  if (instance != null) {
    return instance
  }

  try {
    instance = new MongoDB({
      uri: process.env.MONGODB_URI,
      options: {
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD,
      },
    })
  } catch (error) {
    throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
      ctx: '[mariadb.initiate]: unable to connect mariaDB',
      error,
    })
  }

  return instance
}

export const Mongoose = mongoose

export default MongoDB
