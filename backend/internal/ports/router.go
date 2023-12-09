package ports

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/ports/handlers"
	"delivery-bug/internal/ports/middlewares/cors"
	"delivery-bug/internal/repo"
	"delivery-bug/internal/service"
	"delivery-bug/pkg/logging"
	"github.com/go-playground/validator/v10"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(service service.Service, repo repo.Repository, logger logging.Logger, validator *validator.Validate, auth auth.Auth) *gin.Engine {
	router := gin.Default()

	h := handlers.NewHandler(service, repo, auth, validator, logger)

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(http.StatusOK, "Check")
	})

	router.Use(cors.Middleware())
	api := router.Group("/api")
	{
		client := api.Group("/client")
		{
			client.POST("/login", h.ClientAuthHandler.SignInClient)
			client.POST("/register", h.ClientAuthHandler.SignUpClient)
			//client.Use(authMiddleware.Middleware(&logger))
			client.GET("/:id", h.ClientHandler.GetInfoByID)
		}
		courier := api.Group("/courier")
		{
			courier.POST("/login", h.CourierAuthHandler.SignInCourier)
			courier.POST("/register", h.CourierAuthHandler.SignUpCourier)
			//courier.Use(authMiddleware.Middleware(&logger))
			api.GET("/orders/free", h.OrderHandler.GetFreeOrders)
		}
		products := api.Group("/products")
		{
			products.GET("/", h.ProductHandler.GetProducts)
		}
		orders := api.Group("/orders")
		{
			orders.POST("/", h.OrderHandler.CreateOrder)
		}
		api.POST("/logout", h.ClientAuthHandler.Logout)
	}

	router.StaticFile("/swagger/api.json", "./api/api.json")
	router.Static("/swagger-ui", "./static/swagger-ui/dist")

	return router
}
