import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3W4pXLVayLT0zQ13M-YGX564YeGragp0",
    authDomain: "healthmate-c8e5c.firebaseapp.com",
    projectId: "healthmate-c8e5c",
    storageBucket: "healthmate-c8e5c.appspot.com",
    messagingSenderId: "715228782698",
    appId: "1:715228782698:web:a42075c92fa22db03aea13",
    measurementId: "G-4SB0X37N3G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);