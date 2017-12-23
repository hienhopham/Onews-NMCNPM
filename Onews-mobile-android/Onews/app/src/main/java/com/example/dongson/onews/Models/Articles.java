package com.example.dongson.onews.Models;

import java.util.ArrayList;

/**
 * Created by Dong Son on 01-Nov-17.
 */

public class Articles {
    private Integer id;
    private String category_id;
    private String title;
    private String content;
    private ArrayList<Comments> comments;
    private String author;
    private String created_time;
    private String deleted;
    private String able_to_comment;

    public Articles(Integer id, String category_id, String title, String content, ArrayList<Comments> comments, String author, String created_time, String deleted, String able_to_comment) {
        this.id = id;
        this.category_id = category_id;
        this.title = title;
        this.content = content;
        this.comments = comments;
        this.author = author;
        this.created_time = created_time;
        this.deleted = deleted;
        this.able_to_comment = able_to_comment;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ArrayList<Comments> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comments> comments) {
        this.comments = comments;
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

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    public String getAble_to_comment() {
        return able_to_comment;
    }

    public void setAble_to_comment(String able_to_comment) {
        this.able_to_comment = able_to_comment;
    }

    @Override
    public String toString() {
        return "Articles{" +
                "id=" + id +
                ", category_id='" + category_id + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", comments='" + comments + '\'' +
                ", author='" + author + '\'' +
                ", created_time='" + created_time + '\'' +
                ", deleted='" + deleted + '\'' +
                ", able_to_comment='" + able_to_comment + '\'' +
                '}';
    }
}
