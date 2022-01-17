import { makeStyles } from "@material-ui/core";
import { GetResultsForm } from "./GetResultsForm";

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.black,
        textAlign: "center",
        padding: theme.spacing(4),
    },
}));

export const GetResults = () => {
    const classes = useStyles();

    return (
        <>
            <h2 className={classes.title}>Results</h2>
            <GetResultsForm />
        </>
    );
};
