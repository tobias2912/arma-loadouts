import firebase from "firebase";

export const postLoadout = (name, loadoutString) => {
    var postListRef = firebase.database().ref('loadouts');
    var newPostRef = postListRef.push();
    newPostRef.set({
        name: name,
        loadout: loadoutString
    });
}
export const getLoadouts = () => {
    const dbRef = firebase.database().ref();
    return dbRef.child("loadouts").get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}