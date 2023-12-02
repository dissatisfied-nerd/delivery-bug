package ports

import (
	"delivery-bug/internal/auth"
	handlers "delivery-bug/internal/ports/handlers/auth"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func SetupRoutes(service user.UsersService, logger logging.Logger, validator *validator.Validate, auth auth.Auth) *gin.Engine {
	router := gin.Default()

	h := handlers.NewHandler(service, logger, validator, auth)

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(http.StatusOK, "Check")
	})

	router.POST("/login", h.SignInUser)
	router.POST("/register", h.SignUpUser)
	router.POST("/logout", h.Logout)

	router.StaticFile("/swagger/api.json", "./api/api.json")
	router.Static("/swagger-ui", "./static/swagger-ui/dist")

	return router
}
