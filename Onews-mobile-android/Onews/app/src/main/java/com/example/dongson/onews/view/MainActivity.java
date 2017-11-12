package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import com.example.dongson.onews.Adapters.SectionsPagerAdapter;
import com.example.dongson.onews.Common.AlertDialogManager;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.Models.Tab;
import com.example.dongson.onews.R;

import java.util.ArrayList;
import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    private SectionsPagerAdapter mSectionsPagerAdapter;
    private ViewPager mViewPager;
    private ArrayList<Tab> listTab;
    private SessionManager session;
    private AlertDialogManager alert = new AlertDialogManager();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listTab = new ArrayList<>();
        setList(listTab);

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
            nav_email.setText("you dont login");
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
            nav_user.setText(name);
            nav_email.setText(email);
        }


        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager(), listTab);
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);
        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);

    }

    private void setList(ArrayList<Tab> list) {
        list.add(new Tab("Tổng hợp", ""));
        list.add(new Tab("Kinh tế", ""));
        list.add(new Tab("Chính trị", ""));
        list.add(new Tab("Văn hoá", ""));
        list.add(new Tab("Nghệ thuật", ""));
        list.add(new Tab("Thể Thao", ""));
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

        } else if (id == R.id.nav_logout) {

            if (session.checkLogin() == false) {
                alert.showAlertDialog(MainActivity.this, "Logout failed..", "You dont login", false);
            } else {
                session.logoutUser();
                Intent main = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(main);
            }

        } else if (id == R.id.nav_seting) {

        } else if (id == R.id.nav_info) {
            Intent infoApp = new Intent(getApplicationContext(), InfoAppActivity.class);
            startActivity(infoApp);
            overridePendingTransition(0, 0);
        }
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
