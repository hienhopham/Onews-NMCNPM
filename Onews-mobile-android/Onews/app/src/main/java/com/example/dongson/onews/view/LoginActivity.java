package com.example.dongson.onews.view;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
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
import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.Scope;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity implements
        GoogleApiClient.OnConnectionFailedListener,
        View.OnClickListener {
    private SignInButton bt_google;
    private EditText ed_username, ed_password;
    private SessionManager session;
    private AlertDialogManager alert = new AlertDialogManager();
    private CallbackManager callbackManager;
    private GoogleApiClient mGoogleApiClient;
    private static final int RC_SIGN_IN = 9001;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(this.getApplicationContext());
        setContentView(R.layout.activity_login);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        callbackManager = CallbackManager.Factory.create();
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .requestProfile()
                .requestScopes(new Scope(Scopes.PLUS_ME))
                .requestScopes(new Scope(Scopes.PLUS_LOGIN))
                .build();
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();

        session = new SessionManager(getApplicationContext());
        ed_username = (EditText) findViewById(R.id.ed_username_login);
        ed_password = (EditText) findViewById(R.id.ed_password_login);
        bt_google = (SignInButton) findViewById(R.id.bt_google_login);
        bt_google.setSize(SignInButton.SIZE_STANDARD);
        findViewById(R.id.bt_google_login).setOnClickListener(this);
        findViewById(R.id.bt_facebook_login).setOnClickListener(this);
        findViewById(R.id.bt_register_login).setOnClickListener(this);
        findViewById(R.id.bt_login_login).setOnClickListener(this);
        bt_google.setScopes(gso.getScopeArray());
    }

    public void signInFacebook() {
        LoginManager.getInstance().logInWithReadPermissions(this, Arrays.asList("user_friends", "email", "public_profile", "user_birthday"));
        LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                setFacebookData(loginResult);
            }

            @Override
            public void onCancel() {

            }

            @Override
            public void onError(FacebookException e) {

            }
        });

    }


    private void setFacebookData(final LoginResult loginResult) {
        AccessToken accessToken = loginResult.getAccessToken();
        GraphRequest request = GraphRequest.newMeRequest(
                accessToken,
                new GraphRequest.GraphJSONObjectCallback() {

                    @Override
                    public void onCompleted(
                            JSONObject object,
                            GraphResponse response) {
                        try {
                            String username = (String) object.get("name");
                            String email = response.getJSONObject().getString("email");
                            String face_id = (String) object.get("id");
                            String birthday = object.getString("birthday");
                            String gender = object.getString("gender");
                            String user_photo = "https://graph.facebook.com/" + face_id + "/picture";
//                            session.createLoginSession(username, username, email, user_photo, getString(R.string.login_facebook), birthday, gender);
                            User user = new User(face_id, email, "", username, face_id, "", getString(R.string.login_facebook), birthday, gender);
                            createUserInServer(user, user_photo);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                });
        Bundle parameters = new Bundle();
        parameters.putString("fields", "id,name,gender,birthday,picture,email");
        request.setParameters(parameters);
        request.executeAsync();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        callbackManager.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_SIGN_IN) {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            handleSignInResult(result);
        }
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
            case R.id.bt_google_login:
                signInGoogle();
                break;

            case R.id.bt_facebook_login:
                signInFacebook();
                break;

            case R.id.bt_register_login:
                Intent register = new Intent(getApplicationContext(), RegisterActivity.class);
                startActivity(register);
                overridePendingTransition(0, 0);
                break;

            case R.id.bt_login_login:
                String username = ed_username.getText().toString();
                String password = ed_password.getText().toString();
                if (username.trim().length() > 0 && password.trim().length() > 0) {
                    User user = new User(username, "", FunctionCommon.md5(password), "", "", "", "", "", "");
                    defaultLogin(user);
                } else {
                    alert.showAlertDialog(LoginActivity.this, "Login failed..", "Please fill username and password", false);
                }
                break;
        }
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    private void signInGoogle() {
        Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    private void handleSignInResult(GoogleSignInResult result) {
        if (result.isSuccess()) {
            GoogleSignInAccount acct = result.getSignInAccount();
            if (acct != null) {
                String username = acct.getDisplayName();
                String email = acct.getEmail();
                String google_id = acct.getId();
                Uri user_photo = acct.getPhotoUrl();
                User user = new User(google_id, email, "", username, "", google_id, getString(R.string.login_google), "", "");
                createUserInServer(user, "" + user_photo);
            }
            updateUI(false);
        } else {
            updateUI(true);
        }
    }

    private void updateUI(boolean signedIn) {
        if (signedIn) {
            findViewById(R.id.bt_google_login).setVisibility(View.GONE);
        } else {
            findViewById(R.id.bt_google_login).setVisibility(View.VISIBLE);
        }
    }

    private void createUserInServer(final User user, String ava_url) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_USER).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.create(user);
        final User account = user;
        final String user_photo = ava_url;
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.body().toString().contains("success")) {
                    if (account.getType().equals(getString(R.string.login_google))) {
                        session.createLoginSession(user.getFull_name(), user.getFull_name(), user.getEmail(), "" + user_photo, getString(R.string.login_google), "", "","");

                    } else {
                        session.createLoginSession(user.getFull_name(), user.getFull_name(), user.getEmail(), "" + user_photo, getString(R.string.login_facebook), "", "","");
                    }
                    Intent main = new Intent(getApplicationContext(), MainActivity.class);
                    main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(main);
                    finish();
                } else {
                    if (response.body().toString().contains("error")) {

                        try {
                            JSONObject jObject = new JSONObject(String.valueOf(response.body()));
                            JSONArray jArray = jObject.getJSONArray("user");
                            JSONObject oneObject = jArray.getJSONObject(0);
                            String username = oneObject.getString("username");
                            String fullname = oneObject.getString("full_name");
                            String useremail = oneObject.getString("email");
                            String birthday = oneObject.getString("date_of_birth");
                            String gender = oneObject.getString("gender");

                            if (account.getType().equals(getString(R.string.login_google))) {
                                session.createLoginSession(username, fullname, useremail,"" + user_photo , getString(R.string.login_google), birthday, gender,"");
                            } else {
                                session.createLoginSession(username, fullname, useremail, "" + user_photo, getString(R.string.login_facebook), birthday, gender,"");
                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }


                        Intent main = new Intent(getApplicationContext(), MainActivity.class);
                        main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(main);
                        finish();
                    } else {
                        alert.showAlertDialog(LoginActivity.this, "Login fail", "", false);
                    }

                }
            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });
    }


    private void defaultLogin(User user) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_USER).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.authentication(user);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                if (response.body() != null) {
                    try {
                        JSONObject jObject = new JSONObject(String.valueOf(response.body()));
                        if (response.body().toString().contains("success")) {
                            JSONArray jArray = jObject.getJSONArray("user");
                            JSONObject oneObject = jArray.getJSONObject(0);
                            String username = oneObject.getString("username");
                            String fullname = oneObject.getString("full_name");
                            String useremail = oneObject.getString("email");
                            String birthday = oneObject.getString("date_of_birth");
                            String gender = oneObject.getString("gender");
                            String password = oneObject.getString("password");
                            session.createLoginSession(username, fullname, useremail, "", getString(R.string.login_register), birthday, gender,password);
                            Intent main = new Intent(getApplicationContext(), MainActivity.class);
                            main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            startActivity(main);
                            finish();
                        } else {
                            alert.showAlertDialog(LoginActivity.this, "Login failed..", "Username/Password is incorrect please fill again", false);
                        }

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {
            }
        });
    }
}
