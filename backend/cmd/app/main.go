package main

import (
	"context"
	"delivery-bug/config"
	"delivery-bug/internal/auth"
	"delivery-bug/internal/migrations"
	"delivery-bug/internal/ports"
	"delivery-bug/internal/repo"
	"delivery-bug/internal/service"
	"delivery-bug/pkg/logging"
	"delivery-bug/pkg/storage/postgres"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-playground/validator/v10"
	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/env"
	"golang.org/x/sync/errgroup"
)

func main() {
	logger := logging.GetLogger()

	ctx := context.Background()

	var cfg config.Config
	err := confita.NewLoader(
		env.NewBackend(),
	).Load(ctx, &cfg)
	if err != nil {
		logger.Fatal(err)
	}

	valid := validator.New()
	if err := valid.Struct(&cfg); err != nil {
		logger.Fatal(err)
	}

	db, err := postgres.ConnectDB(cfg.Database)
	if err != nil {
		logger.Fatal(err)
	}
	err = db.Ping(ctx)
	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()
	logger.Info("successfully connected to db")

	migrations.MigrateDB("up", logger, cfg.Database, "./internal/migrations")

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

	repository := repo.NewRepository(db, logger)

	serv := service.NewService(repository, logger)

	auth := auth.NewAuth(cfg.Auth)

	r := ports.SetupRoutes(serv, repository, logger, valid, auth)

	err = http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), r)
	if err != nil {
		logger.Fatal(err)
	}
}
