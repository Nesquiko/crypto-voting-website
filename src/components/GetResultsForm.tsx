import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core";
import { ethers, utils } from "ethers";
import { useState } from "react";
import { getAddress } from "./getAddressOfSymbol";
import { useGerResults } from "./hooks/useGetResults";
import VotingSession from "../chain-info/contracts/VotingSession.json";
import ReactDOM from "react-dom";
import { Alert } from "@material-ui/lab";

export const GetResultsForm = () => {
    const [symbol, setSymbol] = useState<string>("");

    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const handleGetResults = async () => {
        if (symbol === "") {
            alert("Please enter a symbol you want to see results of.");
            return;
        }
        setIsProcessing(true);

        const address = await getAddress(symbol);

        const { abi } = VotingSession;
        const votingSessionInterface = new utils.Interface(abi);
        var provider = ethers.providers.getDefaultProvider("rinkeby");

        const session = new ethers.Contract(
            address,
            votingSessionInterface,
            provider
        );

        var results = await session.getResults();

        if (results === "") {
            setShowError(true);
        }

        const paragraph = <p>{results}</p>;
        ReactDOM.render(paragraph, document.getElementById("results"));
        setIsProcessing(false);
    };

    const [showError, setShowError] = useState(false);
    const handleCloseSnack = () => {
        setShowError(false);
    };

    return (
        <>
            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Symbol</h3>
                <Input onChange={handleSymbolChange} />
            </div>
            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleGetResults}
                >
                    {isProcessing ? (
                        <CircularProgress color="secondary" size={26} />
                    ) : (
                        "Get Results"
                    )}
                </Button>
            </div>
            <div
                id="results"
                style={{
                    float: "left",
                    marginTop: "100px",
                    marginLeft: "50px",
                }}
            ></div>
            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    No choices for this session.
                </Alert>
            </Snackbar>
        </>
    );
};
