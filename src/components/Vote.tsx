import { makeStyles } from "@material-ui/core";
import { VoteForm } from "./VoteForm";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

export const Vote = () => {
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.title}>Vote</h2>
            <VoteForm />
        </>
    );
};
