

import { Box, Card, CardContent, Grid, Snackbar, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from '../styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoadoutCard({ loadout }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const copy = () => {
        navigator.clipboard.writeText(loadout.loadout)
        setOpen(true);
    }

    return (
        <Grid  item xs={6}>
            <Card className={classes.loadoutCard}>
                <CardContent>
                    <Grid container direction="row" alignItems="center" >
                        <Grid item xs={8} spacing={2}>
                            <Typography variant="h4">
                                {loadout.name}
                            </Typography>
                        </Grid>
                        <Grid item xs spacing={2}>
                            <Typography variant="h6">
                                {loadout.author}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box className={classes.loadoutstringbox}>
                        <Typography>
                            {loadout.loadout}
                        </Typography>
                    </Box>
                    <Tooltip title="copy">
                        <FileCopyIcon onClick={copy}></FileCopyIcon>
                    </Tooltip>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={handleClose} severity="success">
                            Copied!
                        </Alert>
                    </Snackbar>
                </CardContent>
            </Card>
        </Grid>
    )
}