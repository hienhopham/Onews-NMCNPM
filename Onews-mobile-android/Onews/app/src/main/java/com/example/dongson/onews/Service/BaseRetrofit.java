package com.example.dongson.onews.Service;

import com.example.dongson.onews.Common.Constant;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by Dong Son on 13-Nov-17.
 */

public abstract class BaseRetrofit {
    private static Retrofit retrofit = null;

    public static Retrofit getRetrofit(String url) {
        if (retrofit == null)
            return new Retrofit.Builder()
                    .baseUrl(url)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        else return retrofit;
    }
}
