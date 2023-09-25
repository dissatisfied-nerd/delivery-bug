# delivery-bug

## Запуск 



Для запуска необходимо добавить `.env` конфигурационный файл 

```.env
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
```

и выполнить команду

```bash
docker compose up --build
```

Для инициализации моделей БД 
```bash
make up_db
```

Для отката миграций
```bash
make down_db
```