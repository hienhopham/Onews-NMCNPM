package com.example.dongson.onews.Models;

/**
 * Created by Dong Son on 01-Nov-17.
 */

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Comments {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("user_id")
    @Expose
    private UserId user_id;
    @SerializedName("article_id")
    @Expose
    private String article_id;
    @SerializedName("content")
    @Expose
    private String content;
    @SerializedName("created_time")
    @Expose
    private String created_time;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public UserId getUser_id() {
        return user_id;
    }

    public void setUser_id(UserId user_id) {
        this.user_id = user_id;
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }



}