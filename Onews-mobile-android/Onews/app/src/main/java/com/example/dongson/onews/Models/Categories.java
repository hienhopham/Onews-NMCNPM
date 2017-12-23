package com.example.dongson.onews.Models;

/**
 * Created by TrangRua on 11/6/2017.
 */

public class Categories {
    private Integer id;
    private String name;
    private int level;
    private Integer parents_id;
    private String deleted;

    public Categories(String name, int level, Integer parents_id, String deleted) {
        this.name = name;
        this.level = level;
        this.parents_id = parents_id;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Integer getParents_id() {
        return parents_id;
    }

    public void setParents_id(Integer parents_id) {
        this.parents_id = parents_id;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

    @Override
    public String toString() {
        return "Categories{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", level='" + level + '\'' +
                ", parents_id=" + parents_id +
                ", deleted='" + deleted + '\'' +
                '}';
    }
}
