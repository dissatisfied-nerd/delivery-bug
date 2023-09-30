# delivery-bug

## Запуск при помощи `docker-compose` 



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

## Запуск при установленном `PostgreSQL`



Для запуска необходимо создать базу данных с именем `<db_name>`

```bash
sudo psql -U <user_name> -c "create database <db_name>"
```

Выдать права пользователю

```bash
sudo psql -U <user_name> -c "grant all privileges on database <db_name> to <user_name>;"
```

Для запуска `SQL`- скриптов

```bash
sudo psql -U <user_name> -d <db_name> -a -f <path_to_file> 
```



