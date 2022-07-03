import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from 'apollo-link-http';
import { createApolloProvider } from '@vue/apollo-option';

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
   }),   
  cache: new InMemoryCache(),
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider