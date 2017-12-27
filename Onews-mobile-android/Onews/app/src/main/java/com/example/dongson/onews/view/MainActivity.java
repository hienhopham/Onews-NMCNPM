package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.NavigationView;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.view.GravityCompat;
import android.support.v4.view.ViewPager;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dongson.onews.Adapters.SectionsPagerAdapter;
import com.example.dongson.onews.Common.AlertDialogManager;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.Models.Tab;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.facebook.login.LoginManager;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.gson.JsonObject;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener, GoogleApiClient.OnConnectionFailedListener {

    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;
    private ArrayList<Tab> listTab;
    private SessionManager session;
    private AlertDialogManager alert = new AlertDialogManager();
    private GoogleApiClient mGoogleApiClient;
    private ArrayList<Categories> listCategories;
    private ArrayList<Fragment> listTabFragments;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listTab = new ArrayList<>();
        listCategories = new ArrayList<>();
        listTabFragments =new ArrayList<>();
        setTab();

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();

        session = new SessionManager(getApplicationContext());
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
        View hView = navigationView.getHeaderView(0);
        TextView nav_user = (TextView) hView.findViewById(R.id.tv_user_name);
        TextView nav_email = (TextView) hView.findViewById(R.id.tv_user_email);
        CircleImageView nav_ava = (CircleImageView) hView.findViewById(R.id.img_ava);
        if (session.checkLogin() == false) {
            nav_user.setText("");
            nav_email.setText("you dont login:     LOGIN HERE");
            nav_ava.setVisibility(View.INVISIBLE);
            nav_email.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent login = new Intent(getApplicationContext(), LoginActivity.class);
                    startActivity(login);
                    overridePendingTransition(0, 0);
                }
            });
        } else {
            nav_ava.setVisibility(View.VISIBLE);
            HashMap<String, String> user = session.getUserDetails();
            String name = user.get(SessionManager.KEY_NAME);
            String email = user.get(SessionManager.KEY_EMAIL);
            String img = user.get(SessionManager.KEY_IMAGE);
            String with = user.get(SessionManager.KEY_WITH);


            nav_user.setText(name);
            nav_email.setText(email);
            if (with != getString(R.string.login_register)) {
                Picasso.with(this).load(img).into(nav_ava);
            } else {
                nav_ava.setImageResource(R.drawable.if_ninja_479478);
            }
        }

    }

    private void setTab() {
        Categories category = new Categories("", "", 1, "", "");
        getCategory(category);
    }


    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.nav_contact) {

        } else if (id == R.id.nav_edit) {
            if (session.checkLogin() == false) {
                alert.showAlertDialog(MainActivity.this, "Logout failed..", "You dont login", false);
            } else {
                Intent edit_info_user = new Intent(getApplicationContext(), EditInfoActivity.class);
                startActivity(edit_info_user);
                overridePendingTransition(0, 0);
            }


        } else if (id == R.id.nav_logout) {

            if (session.checkLogin() == false) {
                alert.showAlertDialog(MainActivity.this, "Logout failed..", "You dont login", false);
            } else {
                HashMap<String, String> user = session.getUserDetails();
                String with = user.get(SessionManager.KEY_WITH);
                if (with.equals(getString(R.string.login_facebook))) {
                    LoginManager.getInstance().logOut();
                } else {
                    if (with.equals(getString(R.string.login_google))) {
                        signOut();
                    }
                }
                session.logoutUser();
                Intent main = new Intent(getApplicationContext(), MainActivity.class);
                main.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(main);
                overridePendingTransition(0, 0);
            }

        } else if (id == R.id.nav_info) {
            Intent infoApp = new Intent(getApplicationContext(), InfoAppActivity.class);
            startActivity(infoApp);
            overridePendingTransition(0, 0);
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    private void signOut() {
        Auth.GoogleSignInApi.signOut(mGoogleApiClient);
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    private void getCategory(Categories category) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_CATEGORY).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.all_category(category);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                JSONObject jObject = null;
                try {
                    jObject = new JSONObject(String.valueOf(response.body()));
                    JSONArray jArray = jObject.getJSONArray("category_list");
                    for (int i = 0; i < jArray.length(); i++) {
                        JSONObject oneObject = jArray.getJSONObject(i);
                        String id = oneObject.getString("id");
                        String name = oneObject.getString("name");
                        String level = oneObject.getString("level");
                        String parent_id = oneObject.getString("parent_id");
                        Categories category = new Categories(id, name, Integer.parseInt(level), parent_id, "");
                        listCategories.add(category);
                    }
                    mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());
                    for (int i = 0; i < listCategories.size(); i++) {
                        Log.e("Son",listCategories.get(i).getId());
                        mSectionsPagerAdapter.addFrag(MainFragment.newInstance(listCategories.get(i).getId()),new Tab(listCategories.get(i).getName(), listCategories.get(i).getId()));
                    }
                    mViewPager = (ViewPager) findViewById(R.id.container);
                    mViewPager.setAdapter(mSectionsPagerAdapter);
                    TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
                    tabLayout.setupWithViewPager(mViewPager);

                } catch (JSONException e) {
                    e.printStackTrace();
                }

            }

            @Override
            public void onFailure(Call<JsonObject> call, Throwable t) {

            }
        });


    }

}

