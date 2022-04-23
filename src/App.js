import ApolloClient from "apollo-boost"
import CharityBaseSelection from "./components/CharityBaseSelection"
import { ApolloProvider } from "@apollo/react-hooks"

const client = new ApolloClient({
  uri: "https://charitybase.uk/api/graphql",
  headers: {
    Authorization: "Apikey 67e5e799-4605-4f66-8f68-5f35b7246483",
  },
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div>
          <CharityBaseSelection></CharityBaseSelection>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
