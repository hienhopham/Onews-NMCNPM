package com.example.dongson.onews.Models;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Dong Son on 01-Nov-17.
 */

public class User implements Serializable{
    private String id;
    private String username;
    private String email;
    private String password;
    private String full_name;
    private String gender;
    private String date_of_birth;
    private String face_id;
    private String google_id;
    private String type;
    private Date created_time;


    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String email, String password, String full_name, String face_id, String google_id, String type, String date_of_birth, String gender) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.full_name = full_name;
        this.face_id = face_id;
        this.google_id = google_id;
        this.type = type;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(String date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public String getFace_id() {
        return face_id;
    }

    public void setFace_id(String face_id) {
        this.face_id = face_id;
    }

    public String getGoogle_id() {
        return google_id;
    }

    public void setGoogle_id(String google_id) {
        this.google_id = google_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public Date getCreated_time() {
        return created_time;
    }

    public void setCreated_time(Date created_time) {
        this.created_time = created_time;
    }
}
