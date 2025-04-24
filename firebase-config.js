// firebase-config.js
export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDq8_wQvQzITCNdoGZmxcoC8jOfP2lEN3I",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "wonderdecks-6cadf.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "wonderdecks-6cadf",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "wonderdecks-6cadf.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "715734231945",
    appId: process.env.FIREBASE_APP_ID || "1:715734231945:web:d74cd383ec031e980ecf58",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-Q9DJVZCY6"
};