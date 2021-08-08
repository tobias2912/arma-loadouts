import { TextField } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { postLoadout } from '../service/realtimeAPI';
export default function LoadoutForm() {

    const handleSubmit =(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const loadout = e.target.loadout.value;
        postLoadout(name,loadout)
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <input type="author" name="name" />
                        <input type="string" name="loadout" />
            <input type="submit" value="Submit" />
        </form>
    );
};