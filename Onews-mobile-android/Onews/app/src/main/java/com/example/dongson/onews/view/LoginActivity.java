package com.example.dongson.onews.view;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.dongson.onews.Common.AlertDialogManager;
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
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.GoogleApiClient;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class LoginActivity extends AppCompatActivity implements
        GoogleApiClient.OnConnectionFailedListener,
        View.OnClickListener {
    private Button bt_register;
    private Button bt_login;
    private Button bt_facebook;
    private SignInButton bt_google;
    private EditText ed_username;
    private EditText ed_password;
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
                .build();
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();

        session = new SessionManager(getApplicationContext());
        ed_username = (EditText) findViewById(R.id.ed_username_login);
        ed_password = (EditText) findViewById(R.id.ed_password_login);
        bt_login = (Button) findViewById(R.id.bt_login_login);
        bt_register = (Button) findViewById(R.id.bt_register_login);
        bt_facebook = (Button) findViewById(R.id.bt_facebook_login);
        bt_google = (SignInButton) findViewById(R.id.bt_google_login);
        bt_google.setSize(SignInButton.SIZE_STANDARD);
        findViewById(R.id.bt_google_login).setOnClickListener(this);
        findViewById(R.id.bt_facebook_login).setOnClickListener(this);
        findViewById(R.id.bt_register_login).setOnClickListener(this);
        findViewById(R.id.bt_login_login).setOnClickListener(this);
        bt_google.setScopes(gso.getScopeArray());
    }

    public void signInFacebook() {
        LoginManager.getInstance().logInWithReadPermissions(this, Arrays.asList("user_friends", "email", "public_profile"));
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
//                                    String userName = FunctionCommon.deAccent((String) object.get("name"));
                            String userName = (String) object.get("name");
//                                    String email = response.getJSONObject().getString("email");
                            Log.e("dauxanh", "" + response.toString());
                            String userlink = (String) object.get("link");
                            String id = (String) object.get("id");
                            String userpicture = "https://graph.facebook.com/" + id + "/picture";
                            session.createLoginSession(userName, userlink, userpicture, getString(R.string.login_facebook));
                            User user =new User(userName,userlink,"",userName,id,"",getString(R.string.login_facebook));
                            createUserInServer(user);
                            Intent main = new Intent(getApplicationContext(), MainActivity.class);
                            main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            startActivity(main);
                            finish();
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                });
        Bundle parameters = new Bundle();
        parameters.putString("fields", "id,name,link,birthday,picture");
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
                    User user = new User(username, FunctionCommon.md5(password));
                    defaultLogin(user);
                } else {
                    alert.showAlertDialog(LoginActivity.this, "Login failed..", "Please enter username and password", false);
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
//                String userName = FunctionCommon.deAccent(acct.getDisplayName());
                String userName = acct.getDisplayName();
                String userEmail = acct.getEmail();
                String personId = acct.getId();
                Uri userPhoto = acct.getPhotoUrl();
                session.createLoginSession(userName, userEmail, "" + userPhoto, getString(R.string.login_google));
                User user =new User(userName,userEmail,"",userName,"",personId,getString(R.string.login_google));
                createUserInServer(user);
                Intent main = new Intent(getApplicationContext(), MainActivity.class);
                main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(main);
                finish();
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

    private void createUserInServer(User user){
        RetrofitService retrofit = BaseRetrofit.getRetrofit().create(RetrofitService.class);
        Call<User> call = retrofit.create(user);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {

            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
    }


    private void defaultLogin(User user){
        RetrofitService retrofit = BaseRetrofit.getRetrofit().create(RetrofitService.class);
        Call<User> call = retrofit.login(user);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Log.e("login",response.toString());
                if (response.isSuccessful()) {
//                    session.createLoginSession("admin", "admin@gmail.com", "", getString(R.string.login_register));
//                    Intent main = new Intent(getApplicationContext(), MainActivity.class);
//                    main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//                    startActivity(main);
//                    finish();
                } else {
                    alert.showAlertDialog(LoginActivity.this, "Login failed..", "Username/Password is incorrect", false);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
    }
}
