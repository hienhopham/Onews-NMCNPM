package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dongson.onews.Adapters.ArticleCommentAdapter;
import com.example.dongson.onews.Adapters.ArticleTwoAdapter;
import com.example.dongson.onews.Adapters.DifferentRowAdapter;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.ArticleList;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.CreateData;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ArticleContentActivity extends AppCompatActivity {
    private TextView tv_title,tv_created_time,tv_content,tv_author;
    private ImageView img_article;
    private RecyclerView mRecyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article_content);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        Intent i = getIntent();
        Articles article = (Articles)i.getSerializableExtra("data");
        tv_created_time=(TextView)findViewById(R.id.tv_created_time_content);
        tv_title=(TextView)findViewById(R.id.tv_title_content);
        tv_content=(TextView)findViewById(R.id.tv_content_content);
        tv_author=(TextView)findViewById(R.id.tv_author_content);
        img_article = (ImageView)findViewById(R.id.img_toolbar);
        tv_author.setText("Đưa tin: "+article.getAuthor());
        tv_title.setText(article.getTitle());
        tv_created_time.setText(FunctionCommon.parseDate(article.getCreated_time()));
        String content_article = article.getContent().toString().replace("..,","..").replace(".,",". \n \n").replace("[","").replace("]","");
        tv_content.setText(content_article);
        Picasso.with(this).load(Constant.URL_BASE_IMG+article.getImg()).fit().into(img_article);

        mRecyclerView = (RecyclerView)findViewById(R.id.recycler_View_article_content);
        Categories category = new Categories(article.getCategory_id(), "", 1, "", "");
        getArticle(category,article);

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

    private void getArticle(Categories category, Articles article) {
        final Articles article_remove = article;
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_ARTICLE).create(RetrofitService.class);
        Call<ArticleList> call = retrofit.all_article_of_category(category);
        call.enqueue(new Callback<ArticleList>() {
            @Override
            public void onResponse(Call<ArticleList> call, Response<ArticleList> response) {
                ArticleList articlelist = response.body();
                List<Articles> articles = articlelist.getArticles();
                List<Articles> list = new ArrayList<Articles>();
                for(Articles item: articles){
                    if(!item.getId().equals(article_remove.getId())){
                        list.add(item);
                    }
                }
                mRecyclerView.setLayoutManager(new LinearLayoutManager(ArticleContentActivity.this));
                mRecyclerView.setItemAnimator(new DefaultItemAnimator());
                mRecyclerView.setAdapter(new ArticleTwoAdapter(getBaseContext(),list, new OnItemClickListener() {
                    @Override
                    public void onItemClick(Articles item) {
                        Intent intent = new Intent(getApplication(), ArticleContentActivity.class);
                        intent.putExtra("data", item);
                        startActivity(intent);
                    }
                }));
            }

            @Override
            public void onFailure(Call<ArticleList> call, Throwable t) {

            }
        });
    }
}
