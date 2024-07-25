// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDb_RTH7_cs1LphLz7U2kuGJi12mBOOhTA",
    authDomain: "bfit-6de25.firebaseapp.com",
    projectId: "bfit-6de25",
    storageBucket: "bfit-6de25.appspot.com",
    messagingSenderId: "726642117873",
    appId: "1:726642117873:web:9be6ba475c57d59b902d50",
    measurementId: "G-E9DTNR6MME",
    databaseURL: "https://bfit-6de25-default-rtdb.firebaseio.com/" // Add your Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            alert("Logged in successfully");
            // You can set user data in the Realtime Database here
            // For example: set(ref(database, 'users/' + userCredential.user.uid), { email: email });
            // Redirect or perform other actions
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Handle Forgot Password
document.getElementById('forgotPassword').addEventListener('click', () => {
    const email = prompt('Please enter your email:');
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Password reset email sent!');
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Handle Registration
document.getElementById('register').addEventListener('click', () => {
    const email = prompt('Please enter your email:');
    const password = prompt('Please enter your password:');
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Registered
            alert("Registered successfully");
            // You can save user data in the Realtime Database here
            set(ref(database, 'users/' + userCredential.user.uid), { email: email })
                .then(() => {
                    console.log('User data saved to database');
                })
                .catch((error) => {
                    console.error('Error saving user data: ', error);
                });
            // Redirect or perform other actions
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Example function to retrieve user data
function getUserData(userId) {
    const userRef = ref(database, 'users/' + userId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log('No data available');
        }
    }).catch((error) => {
        console.error(error);
    });
}