import gql from 'graphql-tag'

export const users = gql`
  query users($limit: LimitQuery, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      id
      email
      firstName
      lastName
      gender
      mobile
      activatedAt
      latestLoggedInAt
      role
      status
      confirmedEmail
    }
  }
`

export const userLists = gql`
  query userLists($limit: LimitQuery, $offset: Int) {
    userLists(limit: $limit, offset: $offset) {
      users {
        id
        email
        firstName
        lastName
        gender
        mobile
        activatedAt
        latestLoggedInAt
        role
        status
        confirmedEmail
      }
      totalCount
    }
  }
`
