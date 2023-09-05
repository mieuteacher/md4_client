import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* Google Auth Import */
import { getAuth, signInWithPopup, GoogleAuthProvider  } from "firebase/auth";

/* Your Config */
const firebaseConfig = {
  apiKey: "AIzaSyCGBPlW21hdnAyVZUjhRrYio1z3yfFvzME",
  authDomain: "learnmd4.firebaseapp.com",
  projectId: "learnmd4",
  storageBucket: "learnmd4.appspot.com",
  messagingSenderId: "597863470890",
  appId: "1:597863470890:web:bf4254c286d099fc37b053",
  measurementId: "G-VVXJGFG8QM"
};
/* End Config */

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) { 

  if (!file) { 
    return false
  }
  const fileRef = ref(storage, `${folderName}/` + file.name);

  let url = await uploadBytes(fileRef, file).then( async res => {
    return await getDownloadURL(res.ref)
    .then(url => url)
    .catch(er => false)
  })

  return url
}

/* Google Auth Import */
const googleProvider = new GoogleAuthProvider();

export async function googleLogin() {
  let auth = getAuth(app);
  return await signInWithPopup(auth, googleProvider);
}

