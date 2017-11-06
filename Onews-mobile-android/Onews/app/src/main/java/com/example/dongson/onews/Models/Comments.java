package com.example.dongson.onews.Models;

/**
 * Created by Dong Son on 01-Nov-17.
 */

public class Comments {
    private String user_id;
    private String article_id;
    private String content;
    private String created_time;
    private String deleted;

    public Comments(String user_id, String article_id, String content, String created_time, String deleted) {
        this.user_id = user_id;
        this.article_id = article_id;
        this.content = content;
        this.created_time = created_time;
        this.deleted = deleted;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
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

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "user_id='" + user_id + '\'' +
                ", article_id='" + article_id + '\'' +
                ", content='" + content + '\'' +
                ", created_time='" + created_time + '\'' +
                ", deleted='" + deleted + '\'' +
                '}';
    }
}
