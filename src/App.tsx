import "./App.css";
import { DAppProvider, ChainId } from "@usedapp/core";
import { Container } from "@material-ui/core";
import { Header } from "./components/Header";
import { CreateVotingSession } from "./components/CreateVotingSession";
import { Vote } from "./components/Vote";
import { AddChoice } from "./components/AddChoice";

function App() {
    return (
        <DAppProvider
            config={{
                readOnlyChainId: ChainId.Rinkeby,
                notifications: {
                    expirationPeriod: 1000,
                    checkInterval: 1000,
                },
            }}
        >
            <Header />
            <div>
                <Container maxWidth="lg">
                    <CreateVotingSession />
                </Container>
            </div>
            <div style={{ paddingTop: "200px" }}>
                <Container maxWidth="lg">
                    <AddChoice />
                </Container>
            </div>
            <div style={{ paddingTop: "200px", paddingBottom: "50px" }}>
                <Container maxWidth="lg">
                    <Vote />
                </Container>
            </div>
            <div style={{ paddingTop: "200px" }} />
        </DAppProvider>
    );
}

export default App;
