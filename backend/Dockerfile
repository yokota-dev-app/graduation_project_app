FROM ruby:3.2.2

# 開発に必要なパッケージをインストール
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /app

# Gemfile と Gemfile.lock をコンテナにコピー
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

# gemのインストール
RUN bundle install

# コンテナ起動時に実行するスクリプトを配置
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

# サーバー起動コマンド（デフォルト）
CMD ["rails", "server", "-b", "0.0.0.0"]