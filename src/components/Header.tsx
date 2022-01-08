import { useEthers } from "@usedapp/core";
import { Button, makeStyles } from "@material-ui/core";

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

    return (
        <div className={classes.container}>
            <h1 className={classes.h1}>Crypto Voting</h1>
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
