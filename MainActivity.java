package com.example.pushnotification;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        // WebView সেটআপ করুন
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient());

        // আপনার ওয়েবসাইট লোড করুন
        webView.loadUrl("https://your-website-url.com");

        // Firebase Messaging সক্রিয় করুন
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w("FCM", "Fetching FCM token failed", task.getException());
                    return;
                }

                // FCM token পেয়ে গেছেন
                String token = task.getResult();
                Log.d("FCM Token", token);

                // এখানে আপনি টোকেনটি ওয়েবসাইটে পাঠাতে পারেন
                sendTokenToWeb(token);
            });
    }

    // টোকেন ওয়েবসাইটে পাঠানোর ফাংশন
    private void sendTokenToWeb(String token) {
        // JavaScript ইন্টারফেস ব্যবহার করে টোকেন পাঠান
        webView.evaluateJavascript("window.setFCMToken('" + token + "');", null);
    }
}