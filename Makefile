up_db:
	docker-compose exec -T db psql "dbname=bd user=user password=password" <migrations/up.sql

down_db:
	docker-compose exec -T db psql "dbname=bd user=user password=password" <migrations/down.sql

db_up:
	psql -U postgres -d delivery_bug -a -f ~/projects/delivery-bug/migrations/up.sql > /dev/null  

db_down:
	psql -U postgres -d delivery_bug -a -f ~/projects/delivery-bug/migrations/down.sql  

