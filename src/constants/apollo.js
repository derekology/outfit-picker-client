import { ApolloClient } from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';
import { createApolloProvider } from '@vue/apollo-option';

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.API_URL,
   })
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider