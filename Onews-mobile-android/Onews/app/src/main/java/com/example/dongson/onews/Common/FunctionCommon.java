package com.example.dongson.onews.Common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    public static String md5(String in) {
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("MD5");
            digest.reset();
            digest.update(in.getBytes());
            byte[] a = digest.digest();
            int len = a.length;
            StringBuilder sb = new StringBuilder(len << 1);
            for (int i = 0; i < len; i++) {
                sb.append(Character.forDigit((a[i] & 0xf0) >> 4, 16));
                sb.append(Character.forDigit(a[i] & 0x0f, 16));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) { e.printStackTrace(); }
        return null;
    }

    public static String parseDate(String date){
        SimpleDateFormat in_put_time= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat out_put_time= new SimpleDateFormat("HH:mm:ss   dd-MM-yyyy");
        Date d = null;
        date = date.toUpperCase();
        try {
            d = in_put_time.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return out_put_time.format(d).toString();
    }
}
