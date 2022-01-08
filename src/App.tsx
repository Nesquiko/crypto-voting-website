import "./App.css";
import { DAppProvider, ChainId } from "@usedapp/core";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import { CreateVotingSession } from "./components/CreateVotingSession";

function App() {
    return (
        <DAppProvider
            config={{
                supportedChains: [ChainId.Rinkeby],
                notifications: {
                    expirationPeriod: 1000,
                    checkInterval: 1000,
                },
            }}
        >
            <Header />
            <Container maxWidth="lg">
                <CreateVotingSession />
            </Container>
        </DAppProvider>
    );
}

export default App;
