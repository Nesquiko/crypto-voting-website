import { makeStyles } from "@material-ui/core";
import { CreateVotingSessionForm } from "./CreateVotingSessionForm";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

export const CreateVotingSession = () => {
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.title}>Create Voting Session</h2>
            <CreateVotingSessionForm />
        </>
    );
};
