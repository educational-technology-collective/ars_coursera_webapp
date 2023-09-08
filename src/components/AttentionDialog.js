import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

function AttentionDialog({openDialog, setOpenDialog}) {
    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{"Attention!"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please provide a more detailed hint.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}
                        color="primary">
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AttentionDialog;
