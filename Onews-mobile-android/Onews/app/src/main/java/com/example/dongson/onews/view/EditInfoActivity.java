package com.example.dongson.onews.view;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;

import com.example.dongson.onews.Common.AlertDialogManager;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.R;
import com.squareup.picasso.Picasso;

import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;

public class EditInfoActivity extends AppCompatActivity implements
        View.OnClickListener {
    private EditText ed_username, ed_full_name, ed_birthday, ed_user_email;
    private CircleImageView img_ava;
    private RadioButton rb_gender;
    private AlertDialogManager alert = new AlertDialogManager();
    private SessionManager session;

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
        findViewById(R.id.bt_save_edit).setOnClickListener(this);

        HashMap<String, String> user = session.getUserDetails();
        String username = user.get(SessionManager.KEY_NAME);
        String email = user.get(SessionManager.KEY_EMAIL);
        String img = user.get(SessionManager.KEY_IMAGE);
        String full_name = user.get(SessionManager.KEY_FULL_NAME);
        String birthday = user.get(SessionManager.KEY_BIRTHDAY);
        String gender = user.get(SessionManager.KEY_GENDER);
        String with = user.get(SessionManager.KEY_WITH);
        ed_username.setText(username);
        ed_user_email.setText(email);
        ed_full_name.setText(full_name);
        ed_birthday.setText(birthday);
        if (with != getString(R.string.login_register)) {
            Picasso.with(this).load(img).into(img_ava);
        } else {
            img_ava.setImageResource(R.drawable.if_ninja_479478);
        }

    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        overridePendingTransition(0, 0);
        return true;
    }

    public void onRadioButtonClicked(View view) {
        // Is the button now checked?
        boolean checked = ((RadioButton) view).isChecked();

        // Check which radio button was clicked
        switch(view.getId()) {
            case R.id.gender_male_edit:
                if (checked)
                    // Pirates are the best
                    break;
            case R.id.gender_female_edit:
                if (checked)
                    // Ninjas rule
                    break;
            case R.id.gender_different_edit:
                if (checked)
                    // Ninjas rule
                    break;
        }
    }

    @Override
    public void onClick(View view) {

    }
}
