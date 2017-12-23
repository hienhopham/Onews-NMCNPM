package com.example.dongson.onews.Adapters;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;

import com.example.dongson.onews.Models.Tab;
import com.example.dongson.onews.view.MainFragment;

import java.util.ArrayList;

/**
 * Created by Dong Son on 06-Nov-17.
 */

public class SectionsPagerAdapter extends FragmentPagerAdapter {
    private ArrayList<Tab> listTab;

    public SectionsPagerAdapter(FragmentManager fm, ArrayList<Tab> list) {
        super(fm);
        listTab=list;
    }

    @Override
    public Fragment getItem(int position) {
        return MainFragment.newInstance();
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
