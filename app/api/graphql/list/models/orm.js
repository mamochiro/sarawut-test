import { Mongoose, initiate } from 'api/connectors/mongodb'

const instance = initiate()

const List = instance.connect({
  service: 'test',
  database: 'test',
  collection: 'list',
  schema: new Mongoose.Schema({
    name: { type: String },
    info: { type: String },
  }),
})

export default List
