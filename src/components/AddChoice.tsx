import { makeStyles } from "@material-ui/core";
import { AddChoiceForm } from "./AddChoiceForm";
import { CreateVotingSessionForm } from "./CreateVotingSessionForm";
import { VoteForm } from "./VoteForm";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

export const AddChoice = () => {
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.title}>Add Choice</h2>
            <AddChoiceForm />
        </>
    );
};
