import { INTEGER, STRING } from 'sequelize'
import { initiate } from 'api/connectors/mariadb'

const instance = initiate()

const Users = instance.connect({
  service: 'users',
  database: 'test',
  table: 'users',
  schema: {
    id: { type: INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    email: { type: STRING(100), unique: true },
    password: { type: STRING(255) },
    firstName: { type: STRING(50) },
    lastName: { type: STRING(50) },
  },
  options: {
    indexes: [
      {
        fields: ['id'],
      },
      {
        fields: ['email'],
      },
    ],
    timestamps: true,
  },
})

export default Users
