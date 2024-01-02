# SlavicMarket

## Описание
Учебный проект: "Сервис доставки и отслеживания заказов". Веб-приложение, в котором реализованы 4 роли:
<ul>
  <li>
    Клиент
    <ul>
      <li>Отображение всех товаров</li>
      <li>Корзина</li>
      <li>Профиль для отслеживания заказов</li>
    </ul>
  </li>
  <li>
    Курьер
    <ul>
      <li>Отображение всех свободных заказов</li>
      <li>Возможность взять заказ и завершить его</li>
      <li>Профиль для отслеживания своих заказов</li>
    </ul>
  </li>
  <li>
    Магазин
    <ul>
      <li>Возможность добавить товар на сайт</li>
      <li>Профиль для отображения всех товаров магазина</li>
    </ul>
  </li>
  <li>
    Администратор
    <ul>
      <li>Удаление товаров</li>
    </ul>
  </li>
</ul>
Архитектура frontend-части приложения основана на методологии Feature-Sliced.

Технологии frontend'а: React, redux-tollkit, react-router, axios, eslint.

Проект выполнялся в команде, состоящей из teamlead'a, двух backend-разработчиков и frontend-разработчика.

## Скриншоты работы
### Регистрация 
![Снимок экрана 2023-12-30 в 23 48 46](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/b3f58fe4-c94d-4602-8d76-06fe7261550e)
### Клиент
![Снимок экрана 2023-12-31 в 00 14 31](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/7b331db5-37b8-4278-afee-547caa3d451b)
![Снимок экрана 2023-12-31 в 00 16 03](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/0ca2359b-b33a-4d05-9cbc-a889a6f64892)
![Снимок экрана 2023-12-31 в 00 34 31](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/bc608e4c-1eac-43e9-9725-8c5291e00a90)
![Снимок экрана 2023-12-31 в 00 29 00](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/14f15822-bb5b-42b0-ac84-a29bb3c55c9b)
### Курьер
![Снимок экрана 2023-12-31 в 00 27 18](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/d09a8baf-3917-4622-8505-03423196860e)
![Снимок экрана 2023-12-31 в 00 28 04](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/89ec91c1-9c5e-4bd0-9056-6e6bbcd60252)
### Магазин
![Снимок экрана 2023-12-30 в 23 50 52](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/d1b53259-b1ef-48fe-ae8d-864b1daf4404)
![Снимок экрана 2023-12-31 в 00 05 18](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/ace3941a-da59-46c3-8b92-922745f2c412)
### Администратор
![Снимок экрана 2023-12-31 в 00 40 30](https://github.com/dissatisfied-nerd/delivery-bug/assets/91160077/e5b09ce7-9041-4863-b340-ae330284b0fb)

## Запуск при помощи `docker-compose` 



Для запуска необходимо добавить `.env` конфигурационный файл (для примера см. `.env.example`)

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

Для восстановления тестового дампа (Чтобы сайт был не пустой. Кодовое слово при регистрации админа - "Славяне")
```bash
source .env && docker-compose exec -T db psql "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" <backend/migrations/down.sql && docker-compose exec -T db psql "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" <backend/migrations/dumps/sample.sql
```

Для инициализации моделей БД 
```bash
make up_db
```

Для отката миграций
```bash
make down_db
```

## Swagger doc

`http://localhost:8080/swagger-ui/`

## Модель базы данных

База данных находится в нормальной форме Бойса-Кодда.

![db-diagram](/blob/db-diagram.png)
