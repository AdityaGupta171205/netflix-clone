import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    getFirestore,
    collection
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBN6WgloKkhCqSs1GHJwlR8iRZawangbHs",
    authDomain: "netflix-clone-bf6ad.firebaseapp.com",
    projectId: "netflix-clone-bf6ad",
    storageBucket: "netflix-clone-bf6ad.firebasestorage.app",
    messagingSenderId: "857403267136",
    appId: "1:857403267136:web:34ab2661a471e735d227a5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async ()=>{
    await signOut(auth);
}

export {auth, db, login, signUp, logout};