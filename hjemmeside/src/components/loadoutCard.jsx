

import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
export default function LoadoutCard({ loadout }) {
    console.log("loadout");
    console.log(loadout);
    return (
        <Card>
            <CardContent>
                <Typography>
                    {loadout.author}
                </Typography>
                <Typography>
                    {loadout.name}
                </Typography>
                <Typography>
                    {loadout.loadout}
                </Typography>
            </CardContent>


        </Card>
    )

}