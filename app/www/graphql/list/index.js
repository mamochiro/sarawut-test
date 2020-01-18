import gql from 'graphql-tag'

export const getLists = gql`
  query lists {
    lists {
      id
      name
      info
    }
  }
`

export const createList = gql`
  mutation createList($input: createListInput) {
    createList(input: $input) {
      id
      name
      info
    }
  }
`
