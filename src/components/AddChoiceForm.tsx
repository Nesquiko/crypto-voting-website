import { Button, Input } from "@material-ui/core";
import React from "react";

export const AddChoiceForm = () => {
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
                <Button color="primary" variant="contained">
                    Add
                </Button>
            </div>
        </>
    );
};
