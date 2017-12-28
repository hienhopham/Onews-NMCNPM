package com.example.dongson.onews.Adapters;


import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.Comments;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.Models.SessionManager;
import com.example.dongson.onews.R;
import com.squareup.picasso.Picasso;

import java.util.HashMap;
import java.util.List;

import static com.facebook.FacebookSdk.getApplicationContext;

public class ArticleCommentAdapter extends RecyclerView.Adapter<ArticleCommentAdapter.CommentViewHolder> {
    private List<Comments> commentList;
    private OnItemClickListener listener;
    private Context context;


    public ArticleCommentAdapter(Context context, List<Comments> commentList, OnItemClickListener listener) {
        this.commentList = commentList;
        this.listener = listener;
        this.context = context;

    }

    @Override
    public CommentViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.article_comment, parent, false);

        return new CommentViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(CommentViewHolder holder, int position) {
        Comments object = commentList.get(position);
        if (object != null) {
            holder.bind(context, object, listener);
        }


    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    public static class CommentViewHolder extends RecyclerView.ViewHolder {
        private TextView content_comment, user_comment, created_time;
        private ImageView img_profile_comment;

        public CommentViewHolder(View itemView) {
            super(itemView);
            content_comment = (TextView) itemView.findViewById(R.id.tv_content_comment);
            user_comment = (TextView) itemView.findViewById(R.id.tv_user_comment);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_comment);
            img_profile_comment = (ImageView) itemView.findViewById(R.id.img_profile_comment);
        }

        public void bind(final Context context, final Comments item, final OnItemClickListener listener) {
            SessionManager session;
            session = new SessionManager(getApplicationContext());
            if (session.checkLogin() == true) {
                HashMap<String, String> user = session.getUserDetails();
                String id = user.get(SessionManager.KEY_ID);
                String img = user.get(SessionManager.KEY_IMAGE);
                if (id.equals(item.getUser_id().getId())) {
                    Picasso.with(context).load(img).into(img_profile_comment);
                } else {
                    img_profile_comment.setImageResource(R.drawable.if_ninja_479478);
                }
            } else {
                img_profile_comment.setImageResource(R.drawable.if_ninja_479478);
            }
            content_comment.setText(item.getContent());
            user_comment.setText(item.getUser_id().getFull_name());
            created_time.setText(FunctionCommon.parseDate(item.getCreated_time()));
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onItemClick(item);
                }
            });
        }

    }
}

