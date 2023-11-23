package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() http.Handler {
	router := gin.Default()

	router.GET("/healthcheck", func(c *gin.Context) {
		c.String(http.StatusOK, "Check")
	})

	return router
}
