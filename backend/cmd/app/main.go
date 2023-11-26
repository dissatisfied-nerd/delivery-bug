package main

import (
	"context"
	"delivery-bug/config"
	"delivery-bug/internal/ports"
	userRepo "delivery-bug/internal/repo/user"
	userService "delivery-bug/internal/service/user"
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

	validator := validator.New()
	if err := validator.Struct(&cfg); err != nil {
		logger.Fatal(err)
	}

	db, err := postgres.ConnectDB(cfg.Database)
	if err != nil {
		logger.Fatal(err)
	}

	_, err = db.Exec(ctx, "SELECT * from addresses")
	if err != nil {
		logger.Error(err)
	}
	logger.Info("successfully connected to db")

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

	r := ports.SetupRoutes(serv, logger, validator)

	logger.Infof("port:%s", cfg.Port)

	err = http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), r)
	if err != nil {
		logger.Fatal(err)
	}
}
