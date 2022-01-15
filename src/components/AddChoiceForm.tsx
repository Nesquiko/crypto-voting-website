import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNotifications } from "@usedapp/core";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { getAllChoicesForSymbol } from "./ChoicesParagraph";
import { useAddChoice } from "./hooks/useAddChoice";

export const AddChoiceForm = () => {
    const [symbol, setSymbol] = useState<string>("");
    const [choice, setChoice] = useState<string>("");
    const { notifications } = useNotifications();

    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChoice(event.target.value);
    };

    const addChoiceSetup = useAddChoice();
    const { addChoice, addChoiceState } = addChoiceSetup(choice, symbol);
    const handleAddChoice = () => {
        if (symbol === "") {
            alert(
                "Please enter a symbol of voting session when adding a new choice."
            );
            return;
        }
        if (choice === "") {
            alert("Please enter a new choice.");
            return;
        }

        return addChoice();
    };

    const isProcessing = addChoiceState.status === "Mining";
    const [showAddChoiceSuccess, setShowAddChoiceSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showInvalidSymbol, setShowInvalidSymbol] = useState(false);
    const [gettingChoices, setGettingChoices] = useState(false);

    useEffect(() => {
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Add choice."
            ).length > 0
        ) {
            setShowAddChoiceSuccess(true);
            setShowError(false);
        }
        if (addChoiceState.errorMessage) {
            setShowAddChoiceSuccess(false);
            setShowError(true);
        }
    }, [notifications, showAddChoiceSuccess, addChoiceState]);

    const handleCloseSnack = () => {
        setShowAddChoiceSuccess(false);
        setShowError(false);
        setShowInvalidSymbol(false);
    };

    const getChoicesForSymbol = (symbol: string) => {
        if (symbol === "") {
            alert(
                "Please enter a symbol for which you want to see all choices."
            );
            return;
        }

        setGettingChoices(true);
        const choices = getAllChoicesForSymbol(symbol, () => {
            setShowInvalidSymbol(true);
        });
        choices.then((result) => {
            var formattedChoices: string = "";
            for (var choice in result) {
                formattedChoices += result[choice] + " | ";
            }

            const paragraph = <p>{formattedChoices}</p>;
            ReactDOM.render(paragraph, document.getElementById("choices"));
            setGettingChoices(false);
        });
    };

    return (
        <>
            <div>
                <Button
                    variant="outlined"
                    onClick={() => getChoicesForSymbol(symbol)}
                >
                    {gettingChoices ? (
                        <CircularProgress color="secondary" size={26} />
                    ) : (
                        "Get Choices"
                    )}
                </Button>
            </div>
            <div id="choices">
                <p></p>
            </div>
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAddChoice}
                >
                    {isProcessing ? (
                        <CircularProgress color="secondary" size={26} />
                    ) : (
                        "Add"
                    )}
                </Button>
            </div>
            <Snackbar
                open={showAddChoiceSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Choice added.
                </Alert>
            </Snackbar>
            <Snackbar
                open={showError}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    {"Error: " + addChoiceState.errorMessage}
                </Alert>
            </Snackbar>{" "}
            <Snackbar
                open={showInvalidSymbol}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    Voting session with this symbol does not exist.
                </Alert>
            </Snackbar>
        </>
    );
};
