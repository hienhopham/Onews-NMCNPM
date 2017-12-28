package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.dongson.onews.Adapters.DifferentRowAdapter;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Models.ArticleList;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.Comments;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainFragment extends Fragment {
    String category_id;
    private RecyclerView mRecyclerView;

    public MainFragment() {
    }

    public static MainFragment newInstance(String id) {
        MainFragment fragment = new MainFragment();
        final Bundle args = new Bundle();
        args.putString("category_id", id);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        category_id = getArguments().getString("category_id");

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_main, container, false);
        mRecyclerView = (RecyclerView) rootView.findViewById(R.id.recyclerView);
        Categories category = new Categories(category_id, "", 1, "", "");
        getArticle(category);
        return rootView;
    }


    private void getArticle(Categories category) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_ARTICLE).create(RetrofitService.class);
        Call<ArticleList> call = retrofit.all_article_of_category(category.getId());
        call.enqueue(new Callback<ArticleList>() {
            @Override
            public void onResponse(Call<ArticleList> call, Response<ArticleList> response) {
                ArticleList articlelist = response.body();
                List<Articles> articles = articlelist.getArticles();
                mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
                mRecyclerView.setItemAnimator(new DefaultItemAnimator());
                mRecyclerView.setAdapter(new DifferentRowAdapter(getContext(),articles, new OnItemClickListener() {
                    @Override
                    public void onItemClick(Articles item) {
                        Intent intent = new Intent(getContext(), ArticleContentActivity.class);
                        intent.putExtra("data", item);
                        startActivity(intent);
                    }

                    @Override
                    public void onItemClick(Comments item) {

                    }
                }));
            }

            @Override
            public void onFailure(Call<ArticleList> call, Throwable t) {

            }
        });
    }


}
