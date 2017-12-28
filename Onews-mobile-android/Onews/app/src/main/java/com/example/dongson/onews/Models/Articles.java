package com.example.dongson.onews.Models;

/**
 * Created by Dong Son on 01-Nov-17.
 */


import java.io.Serializable;
import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Articles implements Serializable{

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("img")
    @Expose
    private String img;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("category_id")
    @Expose
    private CategoryId category_id;
    @SerializedName("hot_topic_id")
    @Expose
    private String hot_topic_id;
    @SerializedName("author")
    @Expose
    private String author;
    @SerializedName("created_time")
    @Expose
    private String created_time;
    @SerializedName("comments")
    @Expose
    private List<Object> comments = null;
    @SerializedName("content")
    @Expose
    private List<String> content = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public CategoryId getCategory_id() {
        return category_id;
    }

    public void setCategory_id(CategoryId category_id) {
        this.category_id = category_id;
    }

    public String getHot_topic_id() {
        return hot_topic_id;
    }

    public void setHot_topic_id(String hot_topic_id) {
        this.hot_topic_id = hot_topic_id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }

    public List<Object> getComments() {
        return comments;
    }

    public void setComments(List<Object> comments) {
        this.comments = comments;
    }

    public List<String> getContent() {
        return content;
    }

    public void setContent(List<String> content) {
        this.content = content;
    }
}
