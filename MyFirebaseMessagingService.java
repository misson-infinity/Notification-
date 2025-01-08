package com.example.pushnotification;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token) {
        // FCM Token পাওয়া যাবে এখানে
        Log.d("FCM Token", token);

        // আপনি টোকেনটি সার্ভারে পাঠাতে পারেন অথবা অন্য কোথাও ব্যবহার করতে পারেন
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // পুশ নোটিফিকেশন রিসিভ করার জন্য
    }
}