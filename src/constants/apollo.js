import ApolloClient from "apollo-boost";
import { createApolloProvider } from '@vue/apollo-option'

export default createApolloProvider({
  defaultClient: new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
  })
})