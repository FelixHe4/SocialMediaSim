import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "tailwindcss/tailwind.css";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }) => (
  <>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>
);

export default App;
