// Function to request notification permission
function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("Your browser does not support notifications.");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      alert("Notifications enabled! You will receive a notification daily at 5:34 AM.");
      scheduleDailyNotification();
    } else {
      alert("Notification permission denied.");
    }
  });
}

// Function to schedule a notification for 5:34 AM daily
function scheduleDailyNotification() {
  const now = new Date();
  const targetTime = new Date();

  // Set notification time to 5:34 AM
  targetTime.setHours(5, 34, 0, 0); // 5 = 5 AM, 34 = 34 minutes

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
    const notification = new Notification("কাজ শুরু কর চোখ বন্ধ করে", {
      body: "এখন কাজ শুরু করার সময়।",
      icon: "https://via.placeholder.com/128", // Replace with your own icon URL
    });

    notification.onclick = () => {
      window.focus(); // Bring the website to focus on notification click
      console.log("Notification clicked!");
    };
  }
}

// Attach event listener to the button
document.getElementById("enable-notifications").addEventListener("click", requestNotificationPermission);