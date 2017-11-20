package com.example.dongson.onews.view;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.widget.TextView;

import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.R;

import java.util.HashMap;

public class InfoUserActivity extends AppCompatActivity {
    private SessionManager session;
    private TextView tv_username;
    private TextView tv_email;
    private TextView tv_createed_time;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_user);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        tv_username = (TextView)findViewById(R.id.tv_nameuser_info) ;
        tv_email = (TextView)findViewById(R.id.tv_email_info) ;
        tv_createed_time = (TextView)findViewById(R.id.tv_createdtime_info) ;

        session = new SessionManager(getApplicationContext());
        if (session.checkLogin() == false) {

        }else{
            HashMap<String, String> user = session.getUserDetails();
            String name = user.get(SessionManager.KEY_NAME);
            String email = user.get(SessionManager.KEY_EMAIL);
            tv_username.setText(name);
            tv_email.setText(email);
        }
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        overridePendingTransition(0, 0);
        return true;
    }
}
