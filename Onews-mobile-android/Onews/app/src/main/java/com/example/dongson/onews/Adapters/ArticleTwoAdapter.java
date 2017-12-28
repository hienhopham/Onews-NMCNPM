package com.example.dongson.onews.Adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dongson.onews.Common.Constant;
import com.example.dongson.onews.Common.FunctionCommon;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by Trang Rua on 20-Nov-17.
 */

public class ArticleTwoAdapter extends RecyclerView.Adapter<ArticleTwoAdapter.ArticleTypeTwoViewHolder> {
    private List<Articles> articleList;
    private OnItemClickListener listener;
    private Context context;

    public ArticleTwoAdapter(Context context, List<Articles> articleList, OnItemClickListener listener) {
        this.articleList = articleList;
        this.listener = listener;
        this.context = context;

    }

    @Override
    public ArticleTypeTwoViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.article_type_two, parent, false);

        return new ArticleTypeTwoViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(ArticleTypeTwoViewHolder holder, int position) {
        Articles object = articleList.get(position);
        holder.bind(context, object, listener);
    }

    @Override
    public int getItemCount() {
        return articleList.size();
    }

    public static class ArticleTypeTwoViewHolder extends RecyclerView.ViewHolder {
        private TextView title;
        private TextView created_time;
        private TextView category;
        private ImageView img_article;

        public ArticleTypeTwoViewHolder(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.tv_title_type_two);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_type_two);
            category = (TextView) itemView.findViewById(R.id.tv_category_type_two);
            img_article = (ImageView) itemView.findViewById(R.id.img_article_type_two);
        }

        public void bind(Context context, final Articles item, final OnItemClickListener listener) {
            title.setText(item.getTitle());
            category.setText(item.getCategory_id().getName());
            Picasso.with(context).load(Constant.URL_BASE_IMG + item.getImg()).into(img_article);
            created_time.setText(FunctionCommon.parseDate(item.getCreated_time().toString()));
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onItemClick(item);
                }

            });
        }

    }
}
