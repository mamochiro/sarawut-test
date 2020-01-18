import { Op } from 'sequelize'
import Users from './orm'

export const getUsers = async ids => {
  const normalizedIds = ids.map(id => parseInt(id, 10))

  const users = await Users.findAll({
    where: {
      id: {
        [Op.in]: normalizedIds,
      },
    },
    raw: true,
  })

  return users
}

export const getUserLists = async args => {
  const { offset = 0, limit = null } = args

  const users = await Users.findAll({
    offset,
    limit,
    raw: true,
  })

  return users
}

export const getUser = async id => {
  const normalizedIds = parseInt(id, 10)

  const user = await Users.findOne({
    where: {
      id: normalizedIds,
    },
    raw: true,
  })

  return user
}
