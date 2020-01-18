import { InMemoryCache } from 'apollo-cache-inmemory'
// import schema from '../fragmentTypes.json'

// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData: schema,
// })

export default ({ req, app }) => {
  return {
    // httpEndpoint: 'https://rickandmortyapi.com/graphql/',
    httpEndpoint: process.env.API_HOST,
    // httpLinkOptions: {
    //   'x-locale': 'th',
    // },
    cache: new InMemoryCache(),
  }
}
