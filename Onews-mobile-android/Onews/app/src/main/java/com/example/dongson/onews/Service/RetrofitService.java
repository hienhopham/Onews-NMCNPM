package com.example.dongson.onews.Service;

import com.example.dongson.onews.Models.User;
import com.google.gson.JsonObject;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by Dong Son on 11-Nov-17.
 */

public interface RetrofitService {
    @POST("create")
    Call<JsonObject> create(@Body User user);
    @POST("authentication")
    Call<JsonObject> authentication(@Body User user);
}
