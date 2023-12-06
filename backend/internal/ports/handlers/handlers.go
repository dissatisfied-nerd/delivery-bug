package handlers

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/ports/handlers/auth/client"
	"delivery-bug/internal/ports/handlers/auth/courier"
	"delivery-bug/internal/service"
	"delivery-bug/pkg/logging"
	"github.com/go-playground/validator/v10"
)

type Handler struct {
	ClientAuthHandler  client.ClientsAuthHandler
	CourierAuthHandler courier.CouriersAuthHandler
}

func NewHandler(service service.Service, auth auth.Auth, validator *validator.Validate, l logging.Logger) Handler {
	return Handler{
		ClientAuthHandler:  client.NewHandler(service.UserService, l, validator, auth),
		CourierAuthHandler: courier.NewHandler(service.CourierService, auth, validator, l),
	}
}
