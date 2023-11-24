package ports

import (
	handlers "delivery-bug/internal/ports/handlers/auth"
	"delivery-bug/internal/service/user"
	"delivery-bug/pkg/logging"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(service user.UsersService, logger logging.Logger) *gin.Engine {
	router := gin.Default()

	h := handlers.NewHandler(service, logger)

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(200, "Check")
	})

	router.POST("/login", h.SignInUser)
	router.POST("register", h.SignUpUser)
	router.GET("/logout", h.Logout)

	return router
}
