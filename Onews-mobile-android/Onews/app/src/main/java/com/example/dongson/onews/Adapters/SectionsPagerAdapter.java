package com.example.dongson.onews.Adapters;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.app.ListFragment;

import com.example.dongson.onews.Models.Tab;
import com.example.dongson.onews.view.MainActivity;
import com.example.dongson.onews.view.MainFragment;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dong Son on 06-Nov-17.
 */

public class SectionsPagerAdapter extends FragmentPagerAdapter {
    private ArrayList<Tab> listTab;
    private ArrayList<MainFragment> fragments;


    public SectionsPagerAdapter(FragmentManager fm, ArrayList<Tab> list,ArrayList<MainFragment> fragments) {
        super(fm);
        this.listTab=list;
        this.fragments=fragments;

    }

    @Override
    public MainFragment getItem(int position) {
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
