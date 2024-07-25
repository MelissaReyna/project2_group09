import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDb_RTH7_cs1LphLz7U2kuGJi12mBOOhTA",
    authDomain: "bfit-6de25.firebaseapp.com",
    projectId: "bfit-6de25",
    storageBucket: "bfit-6de25.appspot.com",
    messagingSenderId: "726642117873",
    appId: "1:726642117873:web:9be6ba475c57d59b902d50",
    measurementId: "G-E9DTNR6MME",
    databaseURL: "https://bfit-6de25-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully");
        fetchUserData(userCredential.user.uid);
    } catch (error) {
        alert(error.message);
    }
});

// Handle Forgot Password
document.getElementById('forgotPassword')?.addEventListener('click', () => {
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
document.getElementById('register')?.addEventListener('click', () => {
    const email = prompt('Please enter your email:');
    const password = prompt('Please enter your password:');
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registered successfully");
            set(ref(database, 'users/' + userCredential.user.uid), { email: email })
                .then(() => {
                    console.log('User data saved to database');
                })
                .catch((error) => {
                    console.error('Error saving user data: ', error);
                });
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Fetch user data from Realtime Database
function fetchUserData(userId) {
    const userRef = ref(database, 'users/' + userId);

    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('User data:', userData);
        } else {
            console.log('No user data found');
        }
    }).catch((error) => {
        console.error('Error fetching user data:', error);
    });
}

// Store additional user data (e.g., last login time)
function storeUserData(userId, data) {
    const userRef = ref(database, 'users/' + userId);
    set(userRef, data)
        .then(() => {
            console.log('User data updated successfully');
        })
        .catch((error) => {
            console.error('Error updating user data:', error);
        });
}
