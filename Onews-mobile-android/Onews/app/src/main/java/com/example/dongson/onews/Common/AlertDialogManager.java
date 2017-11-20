package com.example.dongson.onews.Common;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;

import com.example.dongson.onews.R;

/**
 * Created by Dong Son on 13-Nov-17.
 */

public class AlertDialogManager {

    public void showAlertDialog(Context context, String title, String message,
                                Boolean status) {
        AlertDialog alertDialog = new AlertDialog.Builder(context).create();

        // Setting Dialog Title
        alertDialog.setTitle(title);

        // Setting Dialog Message
        alertDialog.setMessage(message);

        if(status != null)

        // Setting OK Button
        alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
            }
        });
        alertDialog.show();
    }
}
