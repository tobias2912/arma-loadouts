import firebase from "firebase";
import { storage } from "../firebase";

const db = firebase.database();

export const postLoadout = (loadout) => {
    loadout.uid = firebase.auth().currentUser.uid;
    console.log("posting loadout:", loadout);
    var postListRef = db.ref('loadouts/' + firebase.auth().currentUser.uid);
    var newPostRef = postListRef.push();
    return newPostRef.set(loadout);
}
export const deleteLoadout = async (userid, loadoutid, loadoutname) => {
    console.log("delete loadout:",userid, loadoutid);
    var loadout = db.ref('loadouts/' + userid + '/' + loadoutid);
    var result = await loadout.remove();
    console.log(result);
    //delete image
    storage.ref(`/loadouts/${loadoutname}`).delete();
}

export const getLoadouts = () => {

    const dbRef = firebase.database().ref();
    return dbRef.child("loadouts").get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export const getLoadoutImg = async (title) => {
    let result = await storage.ref(`/loadouts/${title}`).getDownloadURL();
    return result;
}


export const postImage = async (imageName, imageAsFile, history) => {
    console.log('start of upload')
    // async magic goes here...
    if (imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/loadouts/${imageName}`).put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed',
        (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
        }, (err) => {
            //catches the errors
            console.log(err)
        }, () => {
            //completed
            history.push("/");
        })
}

export const mockedLoadouts = {
    "id1": {
        author: "seahle",
        loadout: '[["rhs_weap_mk18_KAC_bk","","rhsusf_acc_anpeq15_bk","rhsusf_acc_su230a_mrds",["rhs_mag_30Rnd_556x45_M855A1_Stanag",30],[],""],[],["rhsusf_weap_glock17g4","rhsusf_acc_omega9k","","",["rhsusf_mag_17Rnd_9x19_JHP",17],[],""],["U_B_Wetsuit",[]],["V_RebreatherB",[]],["B_ViperHarness_blk_F",[["ACE_SpraypaintBlack",1],["ACE_adenosine",1],["ACE_atropine",1],["ACE_Flashlight_XL50",1],["ACE_salineIV_500",1],["ACE_tourniquet",2],["ACE_EarPlugs",2],["ACE_quikclot",3],["ACE_fieldDressing",4],["ACE_morphine",4],["SmokeShell",2,1],["ACE_M84",2,1],["HandGrenade",2,1],["ACE_Chemlight_HiWhite",2,1],["Chemlight_green",2,1],["rhsusf_mag_17Rnd_9x19_JHP",5,17],["DemoCharge_Remote_Mag",2,1],["U_C_Man_casual_2_F",false],["V_BandollierB_blk",false]]],"","G_B_Diving",["lerca_1200_black","","","",[],[],""],["ItemMap","ItemGPS","","ItemCompass","tf_microdagr","NVGogglesB_blk_F"]]',
        name: "fsk eod med hjelm",
        attributes: ["Night Time", "Silenced"],
        role: "Assault"

    },
    "id2": {
        author: "mirv",
        loadout: '[["rhs_weap_mk18_KAC_bk","","rhsusf_acc_anpeq15_bk","rhsusf_acc_su230a_mrds",["rhs_mag_30Rnd_556x45_M855A1_Stanag",30],[],""],[],["rhsusf_weap_glock17g4","rhsusf_acc_omega9k","","",["rhsusf_mag_17Rnd_9x19_JHP",17],[],""],["U_B_Wetsuit",[]],["V_RebreatherB",[]],["B_ViperHarness_blk_F",[["ACE_SpraypaintBlack",1],["ACE_adenosine",1],["ACE_atropine",1],["ACE_Flashlight_XL50",1],["ACE_salineIV_500",1],["ACE_tourniquet",2],["ACE_EarPlugs",2],["ACE_quikclot",3],["ACE_fieldDressing",4],["ACE_morphine",4],["SmokeShell",2,1],["ACE_M84",2,1],["HandGrenade",2,1],["ACE_Chemlight_HiWhite",2,1],["Chemlight_green",2,1],["rhsusf_mag_17Rnd_9x19_JHP",5,17],["DemoCharge_Remote_Mag",2,1],["U_C_Man_casual_2_F",false],["V_BandollierB_blk",false]]],"","G_B_Diving",["lerca_1200_black","","","",[],[],""],["ItemMap","ItemGPS","","ItemCompass","tf_microdagr","NVGogglesB_blk_F"]]',
        name: "fsk",
    },

    "id3": {
        author: "seahle",
        loadout: '[["rhs_weap_mk18_KAC_bk","","rhsusf_acc_anpeq15_bk","rhsusf_acc_su230a_mrds",["rhs_mag_30Rnd_556x45_M855A1_Stanag",30],[],""],[],["rhsusf_weap_glock17g4","rhsusf_acc_omega9k","","",["rhsusf_mag_17Rnd_9x19_JHP",17],[],""],["U_B_Wetsuit",[]],["V_RebreatherB",[]],["B_ViperHarness_blk_F",[["ACE_SpraypaintBlack",1],["ACE_adenosine",1],["ACE_atropine",1],["ACE_Flashlight_XL50",1],["ACE_salineIV_500",1],["ACE_tourniquet",2],["ACE_EarPlugs",2],["ACE_quikclot",3],["ACE_fieldDressing",4],["ACE_morphine",4],["SmokeShell",2,1],["ACE_M84",2,1],["HandGrenade",2,1],["ACE_Chemlight_HiWhite",2,1],["Chemlight_green",2,1],["rhsusf_mag_17Rnd_9x19_JHP",5,17],["DemoCharge_Remote_Mag",2,1],["U_C_Man_casual_2_F",false],["V_BandollierB_blk",false]]],"","G_B_Diving",["lerca_1200_black","","","",[],[],""],["ItemMap","ItemGPS","","ItemCompass","tf_microdagr","NVGogglesB_blk_F"]]',
        name: "fsk eod med skjerf",
        attributes: ["Night Time", "Silenced", "Medic", "Ghillie"],
        role: "Heavy weapons"

    },
}