import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";
import { useGetAllSymbols } from "./hooks/useGetAllSymbols";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        gap: theme.spacing(1),
    },
    h1: { textAlign: "center" },
    button: {
        position: "absolute",
        right: "15px",
    },
}));

export const Header = () => {
    const classes = useStyles();

    const { account, activateBrowserWallet, deactivate } = useEthers();

    const isConnected = account !== undefined;

    const symbols = useGetAllSymbols();
    const getAllVotingSessionSymbols = () => {
        var formattedSyms: string = "";
        for (var sym in symbols![0]) {
            formattedSyms += symbols![0][sym] + " | ";
        }
        const paragraph = <p>{formattedSyms}</p>;
        ReactDOM.render(paragraph, document.getElementById("symbols"));
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.h1}>Crypto Voting</h1>
            <Button
                variant="outlined"
                style={{
                    float: "left",
                    marginTop: "100px",
                }}
                onClick={getAllVotingSessionSymbols}
            >
                Get All Symbols.
            </Button>
            <div
                id="symbols"
                style={{
                    float: "left",
                    marginTop: "100px",
                }}
            ></div>
            <div>
                {isConnected ? (
                    <Button
                        className={classes.button}
                        color="primary"
                        onClick={deactivate}
                        variant="contained"
                    >
                        Disconnect
                    </Button>
                ) : (
                    <Button
                        className={classes.button}
                        color="primary"
                        onClick={() => activateBrowserWallet()}
                        variant="contained"
                    >
                        Connect Wallet
                    </Button>
                )}
            </div>
        </div>
    );
};
