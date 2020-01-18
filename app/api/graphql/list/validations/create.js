import validator from 'validator'
import { UserInputError } from 'apollo-server'
import { e } from 'api/utils/localize'

export const createLists = args => {
  const errors = []

  if (!validator.isLength(validator.trim(args.name), { min: 1 })) {
    errors.push({
      key: 'name',
      message: e('Please provide the name at least %s charactors', 1),
    })
  }

  if (!validator.isLength(validator.trim(args.info), { min: 1 })) {
    errors.push({
      key: 'info',
      message: e('Please provide the info at least %s charactors', 1),
    })
  }

  if (errors.length) {
    throw new UserInputError(e('Bad Request'), {
      messages: errors,
    })
  }
}

export const updateLists = () => null
