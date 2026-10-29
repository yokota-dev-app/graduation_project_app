#!/bin/bash
set -e

# Railsのサーバー起動時にサーバーPIDファイルが残っていると起動しないため削除する
rm -f /app/tmp/pids/server.pid

# コンテナのCMDに渡されたコマンドを実行する（Railsサーバー起動など）
exec "$@"