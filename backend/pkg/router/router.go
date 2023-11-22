package router

import "github.com/gin-gonic/gin"

func SetupRoutes() *gin.Engine {
	router := gin.Default()

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(200, "Check")
	})

	return router
}
