up_db:
	docker-compose exec -T db psql "dbname=bd user=user password=password" <migrations/up.sql

down_db:
	docker-compose exec -T db psql "dbname=bd user=user password=password" <migrations/down.sql
