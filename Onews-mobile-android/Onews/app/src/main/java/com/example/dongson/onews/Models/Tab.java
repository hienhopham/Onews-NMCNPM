package com.example.dongson.onews.Models;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by Dong Son on 03-Nov-17.
 */

public class Tab {


    private String tab_name;
    private String tab_url;

    public Tab(String tab_name, String tab_url) {
        this.tab_name = tab_name;
        this.tab_url = tab_url;
    }

    public String getTab_name() {
        return tab_name;
    }

    public void setTab_name(String tab_name) {
        this.tab_name = tab_name;
    }

    public String getTab_url() {
        return tab_url;
    }

    public void setTab_url(String tab_url) {
        this.tab_url = tab_url;
    }
}
