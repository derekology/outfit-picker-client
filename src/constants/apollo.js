import ApolloClient from "apollo-boost";
import { createApolloProvider } from '@vue/apollo-option'

const apolloClient = new ApolloClient({
  uri: "https://outfit-picker-api.herokuapp.com/graphql"
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider