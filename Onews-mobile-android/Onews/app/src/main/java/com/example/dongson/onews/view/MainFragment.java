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
import android.widget.Toast;

import com.example.dongson.onews.Adapters.DifferentRowAdapter;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.CreateData;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;

public class MainFragment extends Fragment {


    public MainFragment() {
    }

    public static MainFragment newInstance() {
        MainFragment fragment = new MainFragment();
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_main, container, false);
        RecyclerView mRecyclerView = (RecyclerView) rootView.findViewById(R.id.recyclerView);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(new DifferentRowAdapter(CreateData.getData(), new OnItemClickListener() {
            @Override public void onItemClick(Articles item) {
                Toast.makeText(getContext(), "Item Clicked", Toast.LENGTH_LONG).show();
//                Intent intent = new Intent(getActivity(), ArticleContentActivity.class);
//                startActivity(intent);
            }
        }));

        return rootView;
    }
}
