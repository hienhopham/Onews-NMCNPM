package com.example.dongson.onews.Models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Created by Dong Son on 27-Dec-17.
 */

public class CommentCreated implements Serializable {
    @SerializedName("comment")
    @Expose
    private Comments comment;
    @SerializedName("success")
    @Expose
    private String success;

    public Comments getComment() {
        return comment;
    }

    public void setComment(Comments comment) {
        this.comment = comment;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

}
