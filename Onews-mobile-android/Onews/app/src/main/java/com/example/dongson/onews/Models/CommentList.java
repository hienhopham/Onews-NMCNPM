package com.example.dongson.onews.Models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by Dong Son on 26-Dec-17.
 */

public class CommentList {
    @SerializedName("comment_list")
    @Expose
    private List<Comments> commentList = null;
    @SerializedName("success")
    @Expose
    private String success;

    public List<Comments> getCommentList() {
        return commentList;
    }

    public void setCommentList(List<Comments> commentList) {
        this.commentList = commentList;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

}
