package com.example.dongson.onews.Service;

import com.example.dongson.onews.Models.ArticleList;
import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.CommentList;
import com.example.dongson.onews.Models.User;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

/**
 * Created by Dong Son on 11-Nov-17.
 */

public interface RetrofitService {
    @POST("create")
    Call<JsonObject> create(@Body User user);

    @POST("authentication")
    Call<JsonObject> authentication(@Body User user);

    @POST("update")
    Call<JsonObject> update(@Body User user);

    @POST("list-by-level")
    Call<JsonObject> all_category(@Body Categories category);

    @FormUrlEncoded
    @POST("list-by-category")
    Call<ArticleList> all_article_of_category(@Field("category_id") String id);

    @FormUrlEncoded
    @POST("comment-by-article")
    Call<CommentList> comments_of_article(@Field("article_id") String id);
}
