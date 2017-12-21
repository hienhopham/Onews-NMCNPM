package com.example.dongson.onews.Service;

import com.example.dongson.onews.Models.Categories;
import com.example.dongson.onews.Models.User;
import com.google.gson.JsonObject;

import retrofit2.Call;
import retrofit2.http.Body;
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

    @POST("list-by-category")
    Call<JsonObject> all_article_of_category(@Body Categories category);
}
