package com.example.dongson.onews.Adapters;


import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dongson.onews.Models.Comments;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;

import java.util.List;

public class ArticleCommentAdapter extends RecyclerView.Adapter<ArticleCommentAdapter.CommentViewHolder> {
    private List<Comments> commentList;
    private OnItemClickListener listener;

    public ArticleCommentAdapter(List<Comments> commentList, OnItemClickListener listener) {
        this.commentList = commentList;
        this.listener = listener;

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
            holder.bind(object, listener);
        }


    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    public static class CommentViewHolder extends RecyclerView.ViewHolder {
        private TextView content_comment,user_comment;
        private ImageView img_profile_comment;

        public CommentViewHolder(View itemView) {
            super(itemView);
            content_comment = (TextView) itemView.findViewById(R.id.tv_content_comment);
            user_comment = (TextView) itemView.findViewById(R.id.tv_user_comment);
            img_profile_comment = (ImageView) itemView.findViewById(R.id.img_profile_comment);
        }

        public void bind(final Comments item, final OnItemClickListener listener) {
            content_comment.setText(item.getContent());
            user_comment.setText(item.getUser_id().getFull_name());
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                }
            });
        }

    }
}

