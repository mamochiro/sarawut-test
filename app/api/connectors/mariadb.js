import Sequelize from 'sequelize'
import { get } from 'lodash'
import { ApolloError } from 'apollo-server'
import { e } from 'api/utils/localize'
import { INTERNAL_SERVER_ERROR } from 'api/utils/errors'

class MariaDB {
  constructor(config) {
    this.config = config
    this.connections = {}
  }

  create(service, database) {
    let connection = get(this.connections, `${service}.${database}`, false)
    if (!connection) {
      connection = new Sequelize(database, null, null, this.config)
      this.connections[`${service}.${database}`] = connection
    }

    return connection
  }

  connect({ service, database, table, schema, options = {} }) {
    const connection = this.create(service, database)
    return connection.define(table, schema, options)
  }
}

export const config = ({ master, slaves, username, password, port }) => {
  const slavesArray = slaves.split(',')
  const readSet = slavesArray.map(slave => ({
    host: slave,
    username,
    password,
  }))

  return {
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+7',
    },
    port,
    replication: {
      read: readSet,
      write: {
        host: master,
        username,
        password,
      },
    },
    pool: {
      max: 20,
      idle: 30000,
    },
    timezone: 'Asia/Bangkok',
  }
}

let instance
export const initiate = () => {
  if (instance != null) {
    return instance
  }

  try {
    instance = new MariaDB(
      config({
        master: process.env.MARIADB_MASTER,
        slaves: process.env.MARIADB_SLAVES,
        username: process.env.MARIADB_USERNAME,
        password: process.env.MARIADB_PASSWORD,
      })
    )
  } catch (error) {
    throw new ApolloError(e('Internal Server Error'), INTERNAL_SERVER_ERROR, {
      ctx: '[mariadb.initiate]: unable to connect mariaDB',
      error,
    })
  }

  return instance
}

export default MariaDB
