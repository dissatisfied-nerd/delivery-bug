package main

import (
	"context"
	"delivery-bug/internal/ports"
	_ "delivery-bug/internal/ports"
	userRepo "delivery-bug/internal/repo/user"
	userService "delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"delivery-bug/pkg/storage/postgres"
	"fmt"
	"github.com/joho/godotenv"
	"golang.org/x/sync/errgroup"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

const maxConns = 100

var logger = logging.GetLogger()

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		logger.Errorf("error loading .env file: %v", err)
	}

	ctx := context.Background()

	config, err := postgres.NewPoolConfig()
	if err != nil {
		logger.Fatal(err)
	}
	config.MaxConns = maxConns

	db, err := postgres.ConnectDB(config)
	if err != nil {
		logger.Fatal(err)
	}
	logger.Info("successfully connected to db")

	_, err = db.Exec(ctx, "SELECT * from addresses")
	if err != nil {
		logger.Error(err)
	}

	// configuring graceful shutdown
	sigQuit := make(chan os.Signal, 1)
	defer close(sigQuit)
	signal.Ignore(syscall.SIGHUP, syscall.SIGPIPE)
	signal.Notify(sigQuit, syscall.SIGINT, syscall.SIGTERM)

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		select {
		case s := <-sigQuit:
			return fmt.Errorf("captured signal: %v", s)
		case <-ctx.Done():
			return nil
		}
	})

	repo := userRepo.NewRepository(db, logger)

	serv := userService.NewService(repo, logger)

	r := ports.SetupRoutes(serv, logger)

	logger.Infof("port:%s", os.Getenv("PORT"))

	err = http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), r)
	if err != nil {
		logger.Fatal(err)
	}
}
