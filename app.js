// Import the functions you need from Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqGnK_eHxHW3Av4ddQrBNInESp8hQei2M",
    authDomain: "push-notification-7a4f0.firebaseapp.com",
    projectId: "push-notification-7a4f0",
    storageBucket: "push-notification-7a4f0.firebasestorage.app",
    messagingSenderId: "385686618021",
    appId: "1:385686618021:web:6f664c5b5eceb384ba324c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission to show notifications
document.getElementById("enable-notifications").addEventListener("click", () => {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            // Get FCM token
            getFCMToken();
        } else {
            console.log("Notification permission denied.");
        }
    });
});

// Get FCM token
function getFCMToken() {
    getToken(messaging, { vapidKey: 'BOkTZfs8IAF16YR2yt9K5gccBF869E9zYTc9L3mzHV_F4VFkfKyGxLgIRAxlx4S8Plvht5vyy41VI5psYzC_waw' })
    .then((currentToken) => {
        if (currentToken) {
            console.log('FCM Token:', currentToken);
            // You can send this token to your server to send notifications
        } else {
            console.log('No registration token available.');
        }
    })
    .catch((err) => {
        console.log('Error getting FCM token:', err);
    });
}

// Handle incoming messages
onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    const notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = () => {
        window.focus();
    };
});