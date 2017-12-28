package com.example.dongson.onews.Models;

/**
 * Created by TrangRua on 11/6/2017.
 */

public class Categories {
    private String id;
    private String name;
    private int level;
    private String parents_id;
    private String deleted;

    public Categories(String id, String name, int level, String parents_id, String deleted) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.parents_id = parents_id;
        this.deleted = deleted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getParents_id() {
        return parents_id;
    }

    public void setParents_id(String parents_id) {
        this.parents_id = parents_id;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }

}
