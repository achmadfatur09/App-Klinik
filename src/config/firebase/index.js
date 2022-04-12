
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSh0U_x9JFEtRyVIS-Dl_PqYr3VSQ2WiA",
    authDomain: "klinik-app-b2df2.firebaseapp.com",
    databaseURL: "https://klinik-app-b2df2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "klinik-app-b2df2",
    storageBucket: "klinik-app-b2df2.appspot.com",
    messagingSenderId: "441810957925",
    appId: "1:441810957925:web:eef27fdd34e343ff84f88c",
    measurementId: "G-2CNFQJP4TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;