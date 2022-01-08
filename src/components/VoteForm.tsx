import { Button, Input } from "@material-ui/core";
import { useState } from "react";

export const VoteForm = () => {
    const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

    return (
        <>
            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Symbol</h3>
                <Input />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Choice</h3>
                <Input />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <h3>Numberof votes per user</h3>
                <Input />
            </div>

            <div
                style={{ float: "left", marginLeft: "50px", marginTop: "50px" }}
            >
                <Button color="primary" variant="contained">
                    Vote
                </Button>
            </div>
        </>
    );
};
