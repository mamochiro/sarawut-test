import models from './models'
import validate from './validations'

export default {
  Query: {
    async list(_, { id }) {
      const list = await models.getList(id)
      return list
    },
    async lists() {
      const lists = await models.getLists()
      return lists
    },
  },
  Mutation: {
    async createList(_, { input }) {
      validate.createLists(input)
      const list = await models.addList(input)
      return list
    },
  },
}
