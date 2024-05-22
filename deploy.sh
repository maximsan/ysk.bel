#!/bin/bash

# Настройки
# REMOTE_USER=maximsan
# REMOTE_HOST=45.87.219.5
# REMOTE_PATH=/httpdocs
# LOCAL_PATH=/dist

echo "Reading variables from .env file..."

# if [ -f .env ]; then
#   export $(cat .env | xargs)
# fi

if [ -f .env ]; then
    # Загружаем только нужные переменные окружения из файла .env
    export $(grep -E "^(REMOTE_USER|REMOTE_HOST|REMOTE_PATH|LOCAL_PATH)=" .env | xargs)
fi

echo "Starting deploy..."

# Команда для синхронизации файлов
rsync -avz --delete $LOCAL_PATH $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

# Выполнение дополнительных команд на сервере (если необходимо)
ssh -t $REMOTE_USER@$REMOTE_HOST << EOF
  cd $REMOTE_PATH || exit 1
  # Здесь можно выполнить команды, например, перезапуск сервера
  # ./restart_server.sh
EOF

echo "Deployment completed!"
