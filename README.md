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



Необходимо создать базу данных с именем `<db_name>` командой

```bash
sudo psql -U <user_name> -c "create database <db_name>"
```

Выдать права пользователю можно командой

```bash
sudo psql -U <user_name> -c "grant all privileges on database <db_name> to <user_name>;"
```

Для запуска `SQL`- скриптов нужно выполнить команду

```bash
sudo psql -U <user_name> -d <db_name> -a -f <path_to_file> 
```



## Модель базы данных

База данных находится в нормальной форме Бойса-Кодда.

![db-diagram](/blob/db-diagram-1.png)
