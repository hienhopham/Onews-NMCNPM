package com.example.dongson.onews.Common;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;

/**
 * Created by Dong Son on 13-Nov-17.
 */

public class AlertDialogManager {

    Boolean delete=false;
    public Boolean showAlertDialog(Context context, String title, String message,
                               Boolean status) {

        AlertDialog.Builder dialog = new AlertDialog.Builder(context);
        dialog.setCancelable(false);
        dialog.setTitle(title);
        dialog.setMessage(message);
        dialog.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int id) {
                delete=true;
            }
        });
        dialog.setNegativeButton("Cancel ", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                delete=false;
                dialog.dismiss();
            }
        });

        final AlertDialog alert = dialog.create();
        alert.show();
        return delete;
    }

}
