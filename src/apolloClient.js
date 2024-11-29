import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log("bn - ",BASE_URL);

const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;