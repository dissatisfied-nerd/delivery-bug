package ports

import (
	"delivery-bug/internal/auth"
	"delivery-bug/internal/ports/handlers"
	"delivery-bug/internal/ports/middlewares/cors"
	"delivery-bug/internal/repo"
	"delivery-bug/internal/service"
	"delivery-bug/pkg/logging"
	"net/http"

	"github.com/go-playground/validator/v10"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(service service.Service, repo repo.Repository, logger logging.Logger, validator *validator.Validate, auth auth.Auth) *gin.Engine {
	router := gin.Default()

	h := handlers.NewHandler(service, repo, auth, validator, logger)

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(http.StatusOK, "Check")
	})

	router.Use(cors.Middleware())
	{
		client := router.Group("/client")
		{
			client.POST("/login", h.ClientAuthHandler.SignInClient)
			client.POST("/register", h.ClientAuthHandler.SignUpClient)
			//client.Use(authMiddleware.Middleware(&logger))
			client.GET("/:clientID", h.ClientHandler.GetInfoByID)
			router.GET("/client/orders/:userID", h.OrderHandler.GetOrdersByUserID)
		}
		courier := router.Group("/courier")
		{
			courier.POST("/login", h.CourierAuthHandler.SignInCourier)
			courier.POST("/register", h.CourierAuthHandler.SignUpCourier)
			//courier.Use(authMiddleware.Middleware(&logger))
			courier.GET("/:courierID", h.CourierAuthHandler.GetInfoByID)
			router.GET("/orders/free", h.OrderHandler.GetFreeOrders)
			router.GET("courier/orders/:courierID", h.OrderHandler.GetOrdersByCourierID)
		}
		store := router.Group("/store")
		{
			store.POST("/login", h.StoreHandler.SignInStore)
			store.POST("/register", h.StoreHandler.SignUpStore)
			store.GET("/:storeID", h.StoreHandler.GetInfoByID)
			store.POST("/products/:storeID", h.ProductHandler.CreateProduct)
			store.GET("/products/:storeID", h.ProductHandler.GetProductsByStore)
		}
		//products := router.Group("/products")
		{
			router.GET("/products", h.ProductHandler.GetProducts)
			router.GET("/products/:productID", h.ProductHandler.GetProductByID)
			router.DELETE("/products/:productID", h.ProductHandler.DeleteProductById)
		}
		orders := router.Group("/orders")
		{
			orders.POST("/", h.OrderHandler.CreateOrder)
			orders.POST("/take", h.OrderHandler.TakeOrder)
			orders.POST("/finish", h.OrderHandler.FinishOrder)
		}
		admin := router.Group("/admin")
		{
			admin.POST("/login", h.AdminAuthHandler.SignInAdmin)
			admin.POST("/register", h.AdminAuthHandler.SignUpAdmin)
			admin.GET("/:adminID", h.AdminAuthHandler.GetInfoByID)
		}
		router.POST("/logout", h.ClientAuthHandler.Logout)
	}

	router.StaticFile("/swagger/api.json", "./api/api.json")
	router.Static("/swagger-ui", "./static/swagger-ui/dist")

	return router
}
