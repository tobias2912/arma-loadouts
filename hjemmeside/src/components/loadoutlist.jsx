
import React from 'react';
import LoadoutCard from './loadoutCard';
export default function Loadoutlist({ loadouts }) {
    if(!loadouts){
        return(<p>no loadouts</p>)
    }
    console.log(loadouts);
    return (
        <>
            {loadouts.map((item, _i) => <LoadoutCard loadout={item}></LoadoutCard>)}
        </>
    )
}
