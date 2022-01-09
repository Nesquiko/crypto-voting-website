import { Button, CircularProgress, Input, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useCreateVotingSession } from "./useCreateVotingSession";
import { useNotifications } from "@usedapp/core";
import { Alert } from "@material-ui/lab";

function makeid(length: number) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

export const CreateVotingSessionForm = () => {
    const [symbol, setSymbol] = useState<string>(makeid(5));

    const [selectedStartDate, handleStartDateChange] = useState<Date | null>(
        new Date()
    );
    const [selectedEndDate, handleEndDateChange] = useState<Date | null>(
        new Date()
    );

    const [numOfVotes, setNumOfVotes] = useState<number>(0);
    const { notifications } = useNotifications();

    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSymbol =
            event.target.value === "" ? makeid(5) : event.target.value;

        setSymbol(newSymbol);
    };

    const handleNumOfVotesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newAmount =
            event.target.value === "" ? 1 : Number(event.target.value);
        setNumOfVotes(newAmount);
    };

    const { createVotingSession, createVotingSessionState } =
        useCreateVotingSession();

    const handleCreate = () => {
        var startDate = selectedStartDate ? selectedStartDate : new Date();
        var startDateUnixTimestamp =
            Date.UTC(
                startDate.getUTCFullYear(),
                startDate.getUTCMonth(),
                startDate.getUTCDate(),
                startDate.getUTCHours(),
                startDate.getUTCMinutes(),
                startDate.getUTCSeconds()
            ) / 1000;

        var endDate = selectedEndDate ? selectedEndDate : new Date();
        var endDateUnixTimestamp =
            Date.UTC(
                endDate.getUTCFullYear(),
                endDate.getUTCMonth(),
                endDate.getUTCDate(),
                endDate.getUTCHours(),
                endDate.getUTCMinutes(),
                endDate.getUTCSeconds()
            ) / 1000;

        return createVotingSession(
            symbol,
            startDateUnixTimestamp,
            endDateUnixTimestamp,
            numOfVotes
        );
    };

    const isProcessing = createVotingSessionState.status === "Mining";
    const [showCreateVotingSesionSuccess, setShowCSuccessreateVotingSesion] =
        useState(false);

    useEffect(() => {
        if (
            notifications.filter(
                (notification) =>
                    notification.type === "transactionSucceed" &&
                    notification.transactionName === "Create Voting Session"
            ).length > 0
        ) {
            setShowCSuccessreateVotingSesion(true);
        }
    }, [notifications, showCreateVotingSesionSuccess]);

    const handleCloseSnack = () => {
        setShowCSuccessreateVotingSesion(false);
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Start"
                        inputVariant="outlined"
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="End"
                        inputVariant="outlined"
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Numberof votes per user</h3>
                <Input onChange={handleNumOfVotesChange} />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleCreate}
                >
                    {isProcessing ? (
                        <CircularProgress color="secondary" size={26} />
                    ) : (
                        "Create"
                    )}
                </Button>
            </div>
            <Snackbar
                open={showCreateVotingSesionSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Voting Session created!
                </Alert>
            </Snackbar>
        </>
    );
};
