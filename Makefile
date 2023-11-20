docker_up_db:
	docker-compose exec -T db psql "dbname=postgres user=user password=password" <migrations/up.sql

docker_down_db:
	docker-compose exec -T db psql "dbname=postgres user=user password=password" <migrations/down.sql

local_db_up:
	psql -U postgres -d delivery_bug -a -f ~/projects/delivery-bug/migrations/up.sql > /dev/null  

local_db_down:
	psql -U postgres -d delivery_bug -a -f ~/projects/delivery-bug/migrations/down.sql  

