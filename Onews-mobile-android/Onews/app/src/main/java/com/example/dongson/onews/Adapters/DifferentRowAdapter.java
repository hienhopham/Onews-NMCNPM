package com.example.dongson.onews.Adapters;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import com.example.dongson.onews.Models.Articles;
import com.example.dongson.onews.R;
import java.util.List;


public class DifferentRowAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Articles> mList;

    public DifferentRowAdapter(List<Articles> list) {
        this.mList = list;
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
                    ((ArticleTypeOneViewHolder) holder).title.setText(object.getTitle());
                    break;
                case 2:
                    ((ArticleTypeTwoViewHolder) holder).title.setText(object.getTitle());
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
        private ImageView img_article;

        public ArticleTypeOneViewHolder(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.tv_title_type_one);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_type_one);
            img_article = (ImageView) itemView.findViewById(R.id.img_article_type_one);
        }
    }

    public static class ArticleTypeTwoViewHolder extends RecyclerView.ViewHolder {
        private TextView title;
        private TextView created_time;
        private ImageView img_article;

        public ArticleTypeTwoViewHolder(View itemView) {
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.tv_title_type_two);
            created_time = (TextView) itemView.findViewById(R.id.tv_created_time_type_two);
            img_article = (ImageView) itemView.findViewById(R.id.img_article_type_two);
        }
    }
}