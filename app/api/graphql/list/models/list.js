import { Mongoose } from 'api/connectors/mongodb'
import List from './orm'

export const getLists = async () => {
  const lists = await List.find()
  return lists
}

export const getList = async id => {
  const nomailizeId = Mongoose.Types.ObjectId(id)
  const list = await List.findOne({ _id: nomailizeId })
  return list
}

export const addList = async input => {
  const list = await List.create({
    name: input.name,
    info: input.info,
  })
  return list
}
