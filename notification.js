// Import Firebase and Firebase Messaging
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

// Request notification permission
function requestNotificationPermission() {
    if (!("Notification" in window)) {
        alert("Your browser does not support notifications.");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            alert("Notifications enabled! You will receive a notification daily at 6:50 AM.");
            scheduleDailyNotification();
            // Generate FCM token after permission is granted
            getTokenForMessaging();
        } else {
            alert("Notification permission denied.");
        }
    });
}

// Function to generate FCM token
function getTokenForMessaging() {
    getToken(messaging, { vapidKey: 'BOkTZfs8IAF16YR2yt9K5gccBF869E9zYTc9L3mzHV_F4VFkfKyGxLgIRAxlx4S8Plvht5vyy41VI5psYzC_waw' }).then((currentToken) => {
        if (currentToken) {
            console.log('FCM Token:', currentToken);
            // You can send this token to your server to send push notifications
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('Error occurred while retrieving token:', err);
    });
}

// Listen for incoming messages while the app is in the foreground
onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Customize notification behavior
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    // Display the notification
    const notification = new Notification(notificationTitle, notificationOptions);
    notification.onclick = () => {
        window.focus();
    };
});

// Schedule daily notifications for 6:50 AM
function scheduleDailyNotification() {
    const now = new Date();
    const targetTime = new Date();

    // Set notification time to 6:50 AM
    targetTime.setHours(6, 50, 0, 0);

    // If the target time has passed for today, set it for tomorrow
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    // Calculate time remaining until the target time
    const timeUntilNotification = targetTime - now;

    // Set timeout for the first notification
    setTimeout(() => {
        sendNotification();
        // Schedule the notification to repeat daily
        setInterval(sendNotification, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    }, timeUntilNotification);
}

// Function to send notification
function sendNotification() {
    if (Notification.permission === "granted") {
        const notification = new Notification("Start working, close your eyes", {
            body: "It's time to start working now.",
            icon: "https://via.placeholder.com/128", // Replace with your icon URL
        });

        notification.onclick = () => {
            window.focus(); // Bring the website to focus on notification click
            console.log("Notification clicked!");
        };
    }
}

// Attach event listener to the button
document.getElementById("enable-notifications").addEventListener("click", requestNotificationPermission);