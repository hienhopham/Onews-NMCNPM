package com.example.dongson.onews.Common;

import java.text.Normalizer;
import java.util.regex.Pattern;

/**
 * Created by Dong Son on 11-Nov-17.
 */

public final class FunctionCommon {

    public static String deAccent(String str) {
        try {
            String temp = Normalizer.normalize(str, Normalizer.Form.NFD);
            Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
            return pattern.matcher(temp).replaceAll("").replaceAll("đ", "d").replace("Đ","D");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}
