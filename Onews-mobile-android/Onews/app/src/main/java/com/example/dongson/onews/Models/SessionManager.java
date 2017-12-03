package com.example.dongson.onews.Models;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.example.dongson.onews.view.LoginActivity;

import java.util.HashMap;

/**
 * Created by Dong Son on 13-Nov-17.
 */

public class SessionManager {
    SharedPreferences pref;
    SharedPreferences.Editor editor;
    Context _context;
    int PRIVATE_MODE = 0;

    // Sharedpref file name
    private static final String PREF_NAME = "Son";

    // All Shared Preferences Keys
    private static final String IS_LOGIN = "IsLoggedIn";

    // User name (make variable public to access from outside)
    public static final String KEY_NAME = "name";

    // Email address (make variable public to access from outside)
    public static final String KEY_EMAIL = "email";

    // image url (make variable public to access from outside)
    public static final String KEY_IMAGE = "image_url";

    // login with (make variable public to access from outside)
    public static final String KEY_WITH = "with";

    // Constructor
    public SessionManager(Context context) {
        this._context = context;
        pref = _context.getSharedPreferences(PREF_NAME, PRIVATE_MODE);
        editor = pref.edit();
    }

    /**
     * Create login session
     */
    public void createLoginSession(String name, String email,String image_url,String with) {
        editor.putBoolean(IS_LOGIN, true);
        editor.putString(KEY_NAME, name);
        editor.putString(KEY_EMAIL, email);
        editor.putString(KEY_IMAGE, image_url);
        editor.putString(KEY_WITH, with);
        editor.commit();
    }

    /**
     * Check login method wil check user login status and return it
     */
    public boolean checkLogin() {
        return isLoggedIn();
    }


    /**
     * Get stored session data
     */
    public HashMap<String, String> getUserDetails() {
        HashMap<String, String> user = new HashMap<String, String>();
        user.put(KEY_NAME, pref.getString(KEY_NAME, null));
        user.put(KEY_EMAIL, pref.getString(KEY_EMAIL, null));
        user.put(KEY_IMAGE, pref.getString(KEY_IMAGE, null));
        user.put(KEY_WITH, pref.getString(KEY_WITH, null));
        return user;
    }

    /**
     * Clear session details
     */
    public void logoutUser() {
        editor.clear();
        editor.commit();
    }

    /**
     * Quick check for login
     **/
    public boolean isLoggedIn() {
        return pref.getBoolean(IS_LOGIN, false);
    }
}