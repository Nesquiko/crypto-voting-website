import { Button, Input } from "@material-ui/core";
import { useState } from "react";
import { useAddChoice } from "./hooks/useAddChoice";

export const AddChoiceForm = () => {
    const [symbol, setSymbol] = useState<string>("");
    const [choice, setChoice] = useState<string>("");

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
        }
        if (choice === "") {
            alert("Please enter a new choice.");
        }

        return addChoice();
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
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAddChoice}
                >
                    Add
                </Button>
            </div>
        </>
    );
};
