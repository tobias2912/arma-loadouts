export const loadoutRoles = [
    "Rifleman",
    "Marksman",
    "Heavy weapons",
    "Pilot / Driver",
    "Other"];

export const loadoutCamos = [
    "Multicam",
    "Norwegian",
    "Desert",
    "Woodland",
    "Arctic",
    "Other"
];

export const loadoutTags = [
    "Night time",
    "Grenadier",
    "Medic",
    "Frogman",
    "JTAC / Drone Operator",
];

export const getAttributes = () => {
    return loadoutCamos.concat(loadoutTags);
}