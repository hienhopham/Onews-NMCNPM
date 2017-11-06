package com.example.dongson.onews.Models;

/**
 * Created by TrangRua on 11/6/2017.
 */

public class Hot_topics {
    private Integer id;
    private String name;
    private String created_time;
    private String display;
    private String deleted;

    public Hot_topics(Integer id, String name, String created_time, String display, String deleted) {
        this.id = id;
        this.name = name;
        this.created_time = created_time;
        this.display = display;
        this.deleted = deleted;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreated_time() {
        return created_time;
    }

    public void setCreated_time(String created_time) {
        this.created_time = created_time;
    }

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public String getDelete() {
        return deleted;
    }

    public void setDelete(String delete) {
        this.deleted = deleted;
    }

    @Override
    public String toString() {
        return "Hot_topics{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", created_time='" + created_time + '\'' +
                ", display='" + display + '\'' +
                ", delete='" + deleted + '\'' +
                '}';
    }
}

