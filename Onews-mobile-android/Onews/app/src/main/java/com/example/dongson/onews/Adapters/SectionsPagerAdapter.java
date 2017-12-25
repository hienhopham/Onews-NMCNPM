package com.example.dongson.onews.Adapters;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.util.Log;

import com.example.dongson.onews.Models.Tab;

import java.util.ArrayList;

/**
 * Created by Dong Son on 06-Nov-17.
 */

public class SectionsPagerAdapter extends FragmentPagerAdapter {
    private ArrayList<Tab> listTab;
    private ArrayList<Fragment> fragments;



    public SectionsPagerAdapter(FragmentManager fm) {
        super(fm);
        listTab = new ArrayList<>();
        fragments = new ArrayList<>();

    }

    public void addFrag(Fragment fragment, Tab tab) {
        fragments.add(fragment);
        listTab.add(tab);
    }

    @Override
    public Fragment getItem(int position) {
        return fragments.get(position);
    }


    @Override
    public int getCount() {
        return listTab.size();
    }


    @Override
    public CharSequence getPageTitle(int position) {
        return listTab.get(position).getTab_name();

    }
}
