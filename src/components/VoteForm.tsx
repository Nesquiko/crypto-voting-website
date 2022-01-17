import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNotifications } from "@usedapp/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getAddress } from "./getAddressOfSymbol";
import { useCastVote } from "./hooks/useCastVote";

export const VoteForm = () => {
    const [symbol, setSymbol] = useState<string>("");
    const [address, setAddress] = useState<string>(
        ethers.constants.AddressZero
    );
    const [numOfVotes, setNumOfVotes] = useState<number>(0);
    const [choice, setChoice] = useState<string>("");

    const { notifications } = useNotifications();

    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChoice(event.target.value);
    };

    const handleNumOfVotesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newAmount =
            event.target.value === "" ? 0 : Number(event.target.value);
        setNumOfVotes(newAmount);
    };

    const { castVote, castVoteState } = useCastVote(address);
    const handleVoteClicked = async () => {
        if (symbol === "") {
            alert("Please enter a voting session you wish to vote on.");
            return;
        }
        if (choice === "") {
            alert("Please enter a choice you wish to vote on.");
            return;
        }
        if (numOfVotes <= 0) {
            alert("Invalid amount of votes per selected choice.");
            return;
        }
        const address = await getAddress(symbol);
        setAddress(address);

        castVote(choice, numOfVotes);
    };

    const isProcessing = castVoteState.status === "Mining";
    const [showCastVoteSuccessful, setShowCastVoteSuccessful] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Cast vote"
            ).length > 0
        ) {
            setShowCastVoteSuccessful(true);
            setShowError(false);
        }
        if (castVoteState.errorMessage) {
            setShowCastVoteSuccessful(false);
            setShowError(true);
        }
    }, [notifications, showCastVoteSuccessful, castVoteState]);

    const handleCloseSnack = () => {
        setShowCastVoteSuccessful(false);
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
                <h3>Choice</h3>
                <Input onChange={handleChoiceChange} />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Number of votes per user</h3>
                <Input onChange={handleNumOfVotesChange} />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleVoteClicked}
                >
                    {isProcessing ? (
                        <CircularProgress color="secondary" size={26} />
                    ) : (
                        "Vote"
                    )}
                </Button>
            </div>
            <Snackbar
                open={showCastVoteSuccessful}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Voting Session created!
                </Alert>
            </Snackbar>
            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    {"Error: " + castVoteState.errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
