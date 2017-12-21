package com.example.dongson.onews.view;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.example.dongson.onews.Common.AlertDialogManager;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.Models.User;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.google.gson.JsonObject;
import com.squareup.picasso.Picasso;

import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditInfoActivity extends AppCompatActivity{
    private EditText ed_username, ed_full_name, ed_birthday, ed_user_email;
    private CircleImageView img_ava;
    private RadioButton rb_gender;
    private AlertDialogManager alert = new AlertDialogManager();
    private SessionManager session;
    private Button bt_save_edit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_info);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        session = new SessionManager(getApplicationContext());
        ed_username = (EditText) findViewById(R.id.ed_usename_edit);
        ed_full_name = (EditText) findViewById(R.id.ed_full_name_edit);
        ed_user_email = (EditText) findViewById(R.id.ed_email_edit);
        ed_birthday = (EditText) findViewById(R.id.ed_brithday_edit);
        img_ava = (CircleImageView) findViewById(R.id.img_ava);
        bt_save_edit = (Button) findViewById(R.id.bt_save_edit);

        final HashMap<String, String> user = session.getUserDetails();
        String username = user.get(SessionManager.KEY_NAME);
        String email = user.get(SessionManager.KEY_EMAIL);
        String img = user.get(SessionManager.KEY_IMAGE);
        String full_name = user.get(SessionManager.KEY_FULL_NAME);
        String birthday = user.get(SessionManager.KEY_BIRTHDAY);
        String gender = user.get(SessionManager.KEY_GENDER);
        final String with = user.get(SessionManager.KEY_WITH);
        final String pass = user.get(SessionManager.KEY_PASS);
        ed_username.setText(username);
        ed_user_email.setText(email);
        ed_full_name.setText(full_name);
        ed_birthday.setText(birthday);
        if (with != getString(R.string.login_register)) {
            Picasso.with(this).load(img).into(img_ava);
        } else {
            img_ava.setImageResource(R.drawable.if_ninja_479478);
        }

        bt_save_edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = ed_username.getText().toString();
                String fullname = ed_full_name.getText().toString();
                String birthday = ed_birthday.getText().toString();
                String user_email = ed_user_email.getText().toString();
                if(pass !="null" && with.equals(getString(R.string.login_register))){
                    User user = new User(username, user_email, pass, fullname, "", "", "", birthday, "");
                    session.createLoginSession(username, fullname, user_email, "", getString(R.string.login_register), birthday, "",pass);
                    updateInfo(user);
                }else{
                    if (with.equals(getString(R.string.login_google))) {

                    }
                }

            }
        });


    }

    public void onRadioButtonClicked(View view) {
        boolean checked = ((RadioButton) view).isChecked();
        switch (view.getId()) {
            case R.id.rb_gender_male_edit:
                if (checked)
                    break;
            case R.id.rb_gender_female_edit:
                if (checked)
                    break;
            case R.id.rb_gender_different_edit:
                if (checked)
                    break;
        }
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        overridePendingTransition(0, 0);
        return true;
    }


    private void updateInfo(User user) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_USER).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.update(user);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                Toast.makeText(getApplication(), response.body().toString(),
                        Toast.LENGTH_LONG).show();
//                Intent main = new Intent(getApplicationContext(), MainActivity.class);
//                main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//                startActivity(main);
//                finish();
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }
}
