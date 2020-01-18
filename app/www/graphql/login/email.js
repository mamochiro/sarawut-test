import gql from 'graphql-tag'

export const loginWithEmail = gql`
  mutation loginWithEmail($input: loginUserWithEmailInput) {
    loginWithEmail(input: $input) {
      id
      expiresIn
    }
  }
`

export const getUser = gql`
  query user($id: Int!) {
    user(id: $id) {
      email
      firstName
      lastName
    }
  }
`

export const registerWithEmail = gql`
  mutation registerUserWithEmail($input: registerUserWithEmailInput) {
    registerUserWithEmail(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`
