# delivery-bug

## Запуск при помощи `docker-compose` 



Для запуска необходимо добавить `.env` конфигурационный файл 

```.env
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
DB_POOL_SIZE=
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

Для восстановления тестового дампа
```bash
source .env && docker-compose exec -T db psql "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" <backend/migrations/down.sql && docker-compose exec -T db psql "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" <backend/migrations/dumps/sample.sql
```

## Swagger doc

`http://localhost:8080/swagger-ui/`


## Модель базы данных

База данных находится в нормальной форме Бойса-Кодда.

![db-diagram](/blob/db-diagram.png)
