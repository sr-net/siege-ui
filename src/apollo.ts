import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'

import introspectionQueryResultData from './graphql/introspection-result'

export const apolloClient = new ApolloClient({
  name: 'sr.net',
  link: createHttpLink({
    uri: 'https://siege.stratroulette.net/graphql',
  }),
  cache: new InMemoryCache({
    fragmentMatcher: new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    }),
  }),
})
