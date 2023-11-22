package main

import (
	"context"
	"delivery-bug/pkg/logging"
	"delivery-bug/pkg/router"
	"delivery-bug/pkg/storage/postgres"
	"fmt"
	"golang.org/x/sync/errgroup"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

const maxConns = 100

var logger = logging.GetLogger()

func main() {
	ctx := context.Background()

	config, err := postgres.NewPoolConfig()
	if err != nil {
		logger.Fatal(err)
	}
	config.MaxConns = maxConns

	_, err = postgres.ConnectDB(config)
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
	err = http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), r)
	if err != nil {
		logger.Fatal(err)
	}
}
