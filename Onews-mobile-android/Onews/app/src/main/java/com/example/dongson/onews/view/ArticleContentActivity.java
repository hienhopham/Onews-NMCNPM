package com.example.dongson.onews.view;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dongson.onews.Adapters.ArticleCommentAdapter;
import com.example.dongson.onews.Adapters.ArticleTwoAdapter;
import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.ArticleList;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.CommentCreated;
import com.example.dongson.onews.Models.CommentList;
import com.example.dongson.onews.Models.Comments;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.R;
import com.example.dongson.onews.Service.BaseRetrofit;
import com.example.dongson.onews.Service.RetrofitService;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.dongson.onews.Common.FunctionCommon.saveDate;

public class ArticleContentActivity extends AppCompatActivity {
    private TextView tv_title, tv_created_time, tv_content, tv_author, tv_category;
    private ImageView img_article, img_profile_image_content;
    private RecyclerView mRecyclerView;
    private RecyclerView CommentRecyclerView;
    private EditText ed_comment_content;
    private Button bt_comment_post;
    private SessionManager session;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_article_content);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        session = new SessionManager(getApplicationContext());

        Intent i = getIntent();
        Articles article = (Articles) i.getSerializableExtra("data");
        tv_created_time = (TextView) findViewById(R.id.tv_created_time_content);
        tv_title = (TextView) findViewById(R.id.tv_title_content);
        tv_category = (TextView) findViewById(R.id.tv_category);
        tv_content = (TextView) findViewById(R.id.tv_content_content);
        tv_author = (TextView) findViewById(R.id.tv_author_content);
        img_article = (ImageView) findViewById(R.id.img_toolbar);
        img_profile_image_content = (ImageView) findViewById(R.id.profile_image_content);
        ed_comment_content = (EditText) findViewById(R.id.ed_comment_content);
        bt_comment_post = (Button) findViewById(R.id.bt_comment_post);

        tv_author.setText("Đưa tin: " + article.getAuthor());
        tv_title.setText(article.getTitle());
        tv_category.setText(article.getCategory_id().getName());
        tv_created_time.setText("Thời gian: " + FunctionCommon.parseDate(article.getCreated_time()));
        String content_article = article.getContent().toString().replace("..,", "..").replace(".,", ". \n \n").replace("[", "").replace("]", "");
        tv_content.setText(content_article);
        Picasso.with(this).load(Constant.URL_BASE_IMG + article.getImg()).fit().into(img_article);

        mRecyclerView = (RecyclerView) findViewById(R.id.recycler_View_article_content);
        Categories category = new Categories(article.getCategory_id().getId(), "", 1, "", "");
        getArticle(category, article);

        CommentRecyclerView = (RecyclerView) findViewById(R.id.recycler_View_Comment_content);
        getComment(article);
        setComment(article);

    }

    public void setComment(final Articles article) {
        if (session.checkLogin() == false) {
            img_profile_image_content.setImageResource(R.drawable.if_ninja_479478);
            ed_comment_content.setEnabled(false);
            bt_comment_post.setEnabled(false);
        } else {
            HashMap<String, String> user = session.getUserDetails();
            final String id = user.get(SessionManager.KEY_ID);
            String name = user.get(SessionManager.KEY_NAME);
            String email = user.get(SessionManager.KEY_EMAIL);
            String img = user.get(SessionManager.KEY_IMAGE);
            String with = user.get(SessionManager.KEY_WITH);
            if (with != getString(R.string.login_register)) {
                Picasso.with(this).load(img).into(img_profile_image_content);
            } else {
                img_profile_image_content.setImageResource(R.drawable.if_ninja_479478);
            }

            ed_comment_content.setEnabled(true);
            bt_comment_post.setEnabled(true);
            bt_comment_post.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    String content = ed_comment_content.getText().toString();
                    Date date = Calendar.getInstance().getTime();

                    if (content.trim().length() > 0) {
                        addComment(id, article, content, saveDate(date));
                    }
                }
            });
        }
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
        Call<ArticleList> call = retrofit.all_article_of_category(category.getId());
        call.enqueue(new Callback<ArticleList>() {
            @Override
            public void onResponse(Call<ArticleList> call, Response<ArticleList> response) {
                ArticleList articlelist = response.body();
                List<Articles> articles = articlelist.getArticles();
                List<Articles> list = new ArrayList<Articles>();
                for (Articles item : articles) {
                    if (!item.getId().equals(article_remove.getId())) {
                        list.add(item);
                    }
                }
                mRecyclerView.setLayoutManager(new LinearLayoutManager(ArticleContentActivity.this));
                mRecyclerView.setItemAnimator(new DefaultItemAnimator());
                mRecyclerView.setAdapter(new ArticleTwoAdapter(ArticleContentActivity.this, list, new OnItemClickListener() {
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


    private void getComment(Articles article) {
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_COMMENT).create(RetrofitService.class);
        Call<CommentList> call = retrofit.comments_of_article(article.getId());
        call.enqueue(new Callback<CommentList>() {
            @Override
            public void onResponse(Call<CommentList> call, Response<CommentList> response) {
                CommentList commentlist = response.body();
                List<Comments> comments = commentlist.getCommentList();
                CommentRecyclerView.setLayoutManager(new LinearLayoutManager(ArticleContentActivity.this));
                CommentRecyclerView.setItemAnimator(new DefaultItemAnimator());
                ArticleCommentAdapter a = new ArticleCommentAdapter(getBaseContext(), comments, new OnItemClickListener() {
                    @Override
                    public void onItemClick(Articles item) {
                        Toast.makeText(ArticleContentActivity.this, "Item Clicked", Toast.LENGTH_LONG).show();
                    }
                });
                CommentRecyclerView.setAdapter(a);
                a.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Call<CommentList> call, Throwable t) {

            }
        });
    }

    private void addComment(String user_id, Articles article, String content, String created_time) {
        final Articles article1 = article;
        RetrofitService retrofit = BaseRetrofit.getRetrofit(Constant.URL_BASE_COMMENT).create(RetrofitService.class);
        Call<CommentCreated> call = retrofit.comment_created(user_id, article.getId(), content, created_time);
        call.enqueue(new Callback<CommentCreated>() {
            @Override
            public void onResponse(Call<CommentCreated> call, Response<CommentCreated> response) {
                CommentCreated commentlist = response.body();
                getComment(article1);
            }

            @Override
            public void onFailure(Call<CommentCreated> call, Throwable t) {

            }
        });
    }
}
