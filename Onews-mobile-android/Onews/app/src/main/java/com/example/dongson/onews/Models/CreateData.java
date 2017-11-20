package com.example.dongson.onews.Models;

import java.util.ArrayList;
import java.util.List;

public final class CreateData {

    public static List<Articles> getData() {
        List<Articles> list = new ArrayList<>();
        ArrayList<Comments> listComment = new ArrayList<>();

        list.add(new Articles(1,"1","tai nan thuong tam","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan dau kho","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan qua thuong tam cua chang trai","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        list.add(new Articles(1,"1","tai nan","tai nan xay ra tai cau chuong duong",listComment,"son","7h truoc- 9/11/2017","no","true"));
        return list;
    }

    public static List<Comments> getCommentData() {
        List<Comments> list = new ArrayList<>();

        list.add(new Comments("1", "1", "nghe kinh the", "20/11/2017", "no"));
        list.add(new Comments("1", "1", "chuyen the nao vay cac ban", "20/11/2017", "no"));
        list.add(new Comments("1", "1", "cho nay que minh", "20/11/2017", "no"));
        list.add(new Comments("1", "1", "so that day", "20/11/2017", "no"));
        list.add(new Comments("1", "1", "eo!!", "20/11/2017", "no"));
        list.add(new Comments("1", "1", "nghe kinh the", "20/11/2017", "no"));

        return list;


    }
}