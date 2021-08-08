import firebase from "firebase";

export const postLoadout = (name,loadoutString) => {
    var postListRef = firebase.database().ref('loadouts');
    var newPostRef = postListRef.push();
    newPostRef.set({
        name:name,
        loadout:loadoutString
    });
}