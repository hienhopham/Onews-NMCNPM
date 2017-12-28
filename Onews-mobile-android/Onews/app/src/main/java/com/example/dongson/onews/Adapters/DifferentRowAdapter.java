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
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.Models.OnItemClickListener;
import com.example.dongson.onews.R;
import com.squareup.picasso.Picasso;

import java.util.List;


public class DifferentRowAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {


    private List<Articles> mList;
    private OnItemClickListener listener;
    private Context context;

    public DifferentRowAdapter(Context context, List<Articles> list, OnItemClickListener listener) {
        this.mList = list;
        this.listener = listener;
        this.context = context;

    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view;

        switch (viewType) {
            case 1:
                view = LayoutInflater.from(parent.getContext()).inflate(R.layout.article_type_one, parent, false);
                return new ArticleTypeOneViewHolder(view);
            case 2:
                view = LayoutInflater.from(parent.getContext()).inflate(R.layout.article_type_two, parent, false);
                return new ArticleTypeTwoViewHolder(view);
        }
        return null;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Articles object = mList.get(position);
        if (object != null) {
            switch (getItemViewType(position)) {
                case 1:
                    ((ArticleTypeOneViewHolder) holder).bind(context,object, listener);
                    break;
                case 2:
                    ((ArticleTypeTwoViewHolder) holder).bind(context, object, listener);
                    break;
            }

        }
    }

    @Override
    public int getItemCount() {
        if (mList == null)
            return 0;
        return mList.size();
    }

    @Override
    public int getItemViewType(int position) {
        return position%5 == 0 ? 1 : 2;
    }

    public static class ArticleTypeOneViewHolder extends RecyclerView.ViewHolder {
        private TextView title;
        private TextView created_time;
        private TextView category;
        private ImageView img_article;

        public ArticleTypeOneViewHolder(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.tv_title_type_one);
            category = (TextView) itemView.findViewById(R.id.tv_category_type_one);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_type_one);
            img_article = (ImageView) itemView.findViewById(R.id.img_article_type_one);
        }

        public void bind(final Context context, final Articles item, final OnItemClickListener listener) {
            title.setText(item.getTitle());
            category.setText(item.getCategory_id().getName());
            created_time.setText(FunctionCommon.parseDate(item.getCreated_time().toString()));
            Picasso.with(context).load(Constant.URL_BASE_IMG+item.getImg()).into(img_article);
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    listener.onItemClick(item);
                }
            });
        }
    }

    public static class ArticleTypeTwoViewHolder extends RecyclerView.ViewHolder {
        private TextView title;
        private TextView created_time;
        private TextView category;
        private ImageView img_article;

        public ArticleTypeTwoViewHolder(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.tv_title_type_two);
            category = (TextView) itemView.findViewById(R.id.tv_category_type_two);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_type_two);
            img_article = (ImageView) itemView.findViewById(R.id.img_article_type_two);
        }

        public void bind(final Context context, final Articles item, final OnItemClickListener listener) {
            title.setText(item.getTitle());
            category.setText(item.getCategory_id().getName());
            Picasso.with(context).load(Constant.URL_BASE_IMG+item.getImg()).into(img_article);
            created_time.setText(FunctionCommon.parseDate(item.getCreated_time().toString()));
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override public void onClick(View v) {
                    listener.onItemClick(item);
                }
            });
        }

    }
}