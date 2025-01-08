// Firebase setup code (if you need a separate file for Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyAqGnK_eHxHW3Av4ddQrBNInESp8hQei2M",
    authDomain: "push-notification-7a4f0.firebaseapp.com",
    projectId: "push-notification-7a4f0",
    storageBucket: "push-notification-7a4f0.appspot.com",
    messagingSenderId: "385686618021",
    appId: "1:385686618021:web:6f664c5b5eceb384ba324c"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();