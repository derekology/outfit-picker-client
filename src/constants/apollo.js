import ApolloClient from "apollo-boost";
import { createApolloProvider } from '@vue/apollo-option'

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider