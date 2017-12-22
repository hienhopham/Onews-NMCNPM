package com.example.dongson.onews.Models;

import java.util.ArrayList;

/**
 * Created by Dong Son on 01-Nov-17.
 */

public class Articles {
    private String id;
    private String img;
    private String category_id;
    private String title;
    private ArrayList<String> content;
    private ArrayList<Comments> comments;
    private String hot_topic_id;
    private String author;
    private String created_time;
    private Boolean deleted;

    public Articles(String id,String img, String category_id, String title, ArrayList<String> content, ArrayList<Comments> comments, String hot_topic_id, String author, String created_time, Boolean deleted) {
        this.id=id;
        this.img = img;
        this.category_id = category_id;
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.hot_topic_id = hot_topic_id;
        this.author = author;
        this.created_time = created_time;
        this.deleted = deleted;
    }

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

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ArrayList<String> getContent() {
        return content;
    }

    public void setContent(ArrayList<String> content) {
        this.content = content;
    }

    public ArrayList<Comments> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comments> comments) {
        this.comments = comments;
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

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
