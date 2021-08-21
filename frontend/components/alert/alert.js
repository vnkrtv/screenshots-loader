import MuiAlert from "@material-ui/lab/Alert";
import * as React from "react";
import {Snackbar} from "@material-ui/core";

export const alertType = {
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error"
};

export default function NotifyAlert(props) {
    let {type, text, anchorOrigin, open, onClose, autoHideDuration} = props;

    anchorOrigin ??= {vertical: 'top', horizontal: 'center'};
    autoHideDuration ??= 6000;

    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
        >
            <MuiAlert
                onClose={onClose}
                severity={type}
                elevation={6}
                variant="filled"
                {...props}
            >
                {text}
            </MuiAlert>
        </Snackbar>
    )
}
