package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.dongson.onews.Adapters.DifferentRowAdapter;
import com.example.dongson.onews.Adapters.SectionsPagerAdapter;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.CreateData;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.Models.Tab;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainFragment extends Fragment {
    public static String category_id;


    public MainFragment() {
    }

    public static MainFragment newInstance(String id) {
        category_id = id;
        MainFragment fragment = new MainFragment();
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        Categories category = new Categories(category_id, "",1, "", "");
        getArticle(category);

        View rootView = inflater.inflate(R.layout.fragment_main, container, false);
        RecyclerView mRecyclerView = (RecyclerView) rootView.findViewById(R.id.recyclerView);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(new DifferentRowAdapter(CreateData.getData(), new OnItemClickListener() {
            @Override public void onItemClick(Articles item) {
//                Toast.makeText(getContext(), "Item Clicked", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(getActivity(), ArticleContentActivity.class);
                startActivity(intent);
            }
        }));
        return rootView;
    }


    private void getArticle(Categories category) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_ARTICLE).create(RetrofitService.class);
        Call<JsonObject> call = retrofit.all_article_of_category(category);
        call.enqueue(new Callback<JsonObject>() {
            @Override
            public void onResponse(Call<JsonObject> call, Response<JsonObject> response) {
                Log.e("Son",response.body().toString());
                try {
                    JSONObject jObject = new JSONObject(String.valueOf(response.body()));
//                    JSONArray jArray = jObject.getJSONArray("category_list");
//                    for (int i = 0; i < jArray.length(); i++) {
//                        JSONObject oneObject = jArray.getJSONObject(i);
//                        String id = oneObject.getString("id");
//                        String name = oneObject.getString("name");
//                        String level = oneObject.getString("level");
//                        String parent_id = oneObject.getString("parent_id");
//                    }
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
