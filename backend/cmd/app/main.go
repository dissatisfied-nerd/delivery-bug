package main

import (
	"context"
	"delivery-bug/config"
	router "delivery-bug/internal/http"
	"delivery-bug/pkg/logging"
	"delivery-bug/pkg/storage/postgres"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/heetch/confita"
	"github.com/heetch/confita/backend/env"
	"golang.org/x/sync/errgroup"
)

var logger = logging.GetLogger()

func main() {
	ctx := context.Background()

	var cfg config.Config
	err := confita.NewLoader(
		env.NewBackend(),
	).Load(ctx, &cfg)
	if err != nil {
		logger.Fatal(err)
	}

	logger.Info(cfg)

	_, err = postgres.ConnectDB(cfg.Database)
	if err != nil {
		logger.Fatal(err)
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

	r := router.SetupRoutes()
	err = http.ListenAndServe(fmt.Sprintf(":%s", cfg.Port), r)
	if err != nil {
		logger.Fatal(err)
	}
}
