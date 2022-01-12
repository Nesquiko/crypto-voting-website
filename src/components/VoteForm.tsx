import { Button, Input } from "@material-ui/core";

export const VoteForm = () => {
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
