package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.dongson.onews.Common.AlertDialogManager;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.Models.User;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity implements
        View.OnClickListener {
    private EditText ed_username, ed_full_name, ed_password, ed_confirm_password, ed_user_email;
    private AlertDialogManager alert = new AlertDialogManager();
    private SessionManager session;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        ed_username = (EditText) findViewById(R.id.ed_user_name_register);
        ed_full_name = (EditText) findViewById(R.id.ed_full_name_register);
        ed_user_email = (EditText) findViewById(R.id.ed_email_register);
        ed_password = (EditText) findViewById(R.id.ed_password_register);
        ed_confirm_password = (EditText) findViewById(R.id.ed_confirm_register);
        findViewById(R.id.bt_register).setOnClickListener(this);
        session = new SessionManager(getApplicationContext());
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        overridePendingTransition(0, 0);
        return true;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.bt_register:
                String username = ed_username.getText().toString();
                String fullname = ed_full_name.getText().toString();
                String password = ed_password.getText().toString();
                String confirmpassword = ed_confirm_password.getText().toString();
                String useremail = ed_user_email.getText().toString();
                if (username.trim().length() > 0 && password.trim().length() > 0 && fullname.trim().length() > 0 && confirmpassword.trim().length() > 0 && useremail.trim().length() > 0) {
                    if (confirmpassword.equals(password)) {
                        User user = new User(username, useremail, FunctionCommon.md5(password), fullname, "", "", "", "", "");
                        createUserInServer(user);
                    } else {
                        alert.showAlertDialog(RegisterActivity.this, "Register failed..", "Password and confirm password is not same", false);
                    }

                } else {
                    alert.showAlertDialog(RegisterActivity.this, "Register failed..", "Please fill all fields", false);
                }
                break;
        }
    }

    private void createUserInServer(User user) {
        final User user1 = user;
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_USER).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.create(user);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.body().toString().contains("success") || response.body().toString().contains("User already existed")) {
                    try {
                        JSONObject jObject = new JSONObject(String.valueOf(response.body()));
                        JSONArray jArray = jObject.getJSONArray("user");
                        JSONObject oneObject = jArray.getJSONObject(0);
                        String id = oneObject.getString("id");
                        Log.e("Son",id);

                        session.createLoginSession(id, user1.getUsername(), user1.getFull_name(), user1.getEmail(), "", getString(R.string.login_register), "", "", user1.getPassword());
                        Intent main = new Intent(getApplicationContext(), MainActivity.class);
                        main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(main);
                        finish();

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                } else {
                    alert.showAlertDialog(RegisterActivity.this, "Login fail", "", false);
                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }

}
