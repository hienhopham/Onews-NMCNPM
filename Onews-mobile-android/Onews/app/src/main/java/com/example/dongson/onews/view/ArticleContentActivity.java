package com.example.dongson.onews.view;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.widget.Toast;

import com.example.dongson.onews.Adapters.ArticleCommentAdapter;
import com.example.dongson.onews.Adapters.ArticleTwoAdapter;
import com.example.dongson.onews.Adapters.DifferentRowAdapter;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.CreateData;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;

public class ArticleContentActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article_content);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        RecyclerView mRecyclerView = (RecyclerView)findViewById(R.id.recycler_View_article_content);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(ArticleContentActivity.this));
        mRecyclerView.setItemAnimator(new DefaultItemAnimator());
        mRecyclerView.setAdapter(new ArticleTwoAdapter(CreateData.getData(), new OnItemClickListener() {
            @Override public void onItemClick(Articles item) {
                Toast.makeText(ArticleContentActivity.this, "Item Clicked", Toast.LENGTH_LONG).show();
            }
        }));

        RecyclerView CommentRecyclerView = (RecyclerView)findViewById(R.id.recycler_View_Comment_content);
        CommentRecyclerView.setLayoutManager(new LinearLayoutManager(ArticleContentActivity.this));
        CommentRecyclerView.setItemAnimator(new DefaultItemAnimator());
        CommentRecyclerView.setAdapter(new ArticleCommentAdapter(CreateData.getCommentData(), new OnItemClickListener() {
            @Override public void onItemClick(Articles item) {
                Toast.makeText(ArticleContentActivity.this, "Item Clicked", Toast.LENGTH_LONG).show();
            }
        }));
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        overridePendingTransition(0, 0);
        return true;
    }
}
