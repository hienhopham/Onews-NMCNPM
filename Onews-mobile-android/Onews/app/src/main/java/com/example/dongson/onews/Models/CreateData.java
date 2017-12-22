package com.example.dongson.onews.Models;

import java.util.ArrayList;
import java.util.List;

public final class CreateData {

    public static List<Articles> getData() {
        List<Articles> list = new ArrayList<>();
        ArrayList<String> content = new ArrayList<>();
        ArrayList<Comments> listComment = new ArrayList<>();


        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
        list.add(new Articles("","","","Giet ng chat dau",content,listComment,"","dong son","20/12/2017",false));
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