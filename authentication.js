import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const emailInput = document.querySelector("#exampleInputEmail1");
const phoneNumberInput = document.querySelector("#phoneNumber");

const firebaseConfig = {
    apiKey: "AIzaSyCYXLjsbSn8BNuxf96jyIzwH56vl3TA06A",
    authDomain: "tpf-effective-forms-2fd59.firebaseapp.com",
    projectId: "tpf-effective-forms-2fd59",
    storageBucket: "tpf-effective-forms-2fd59.firebasestorage.app",
    messagingSenderId: "589091706591",
    appId: "1:589091706591:web:5f59acb4ece50e51733b6a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const userSignIn = async () => {   
        signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const [name, lastName] = user.displayName.split(" ").map((s) => s.trim())
        firstNameInput.value = name;
        lastName.value = lastName;
        console.log(user);
        console.dir(firstNameInput)
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
const userSignOut = async () => {
   signOut(auth).then(() => {
       alert("You have been signed out!")
   }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
   })
}

onAuthStateChanged(auth, (user) => {
   if (user) {
        alert("You are authenticated with Google");
        console.log(user)
        const [name, surname] = user.displayName.split(" ").map((s) => s.trim())
        firstNameInput.value = name;
        lastNameInput.value = surname;
        emailInput.value = user.email;
        if (user.phoneNumber) {
            phoneNumberInput.value = user.phoneNumber;
        }
   }
})


signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut)

