package auth

import (
	"delivery-bug/internal/auth"
	"delivery-bug/pkg/logging"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"net/http"
	"os"
	"strings"
)

const (
	clientRole  = "client"
	courierRole = "courier"
)

func Middleware(l *logging.Logger) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		requestUrl := ctx.Request.URL
		var role string
		if strings.Contains(requestUrl.String(), clientRole) {
			role = clientRole
		} else if strings.Contains(requestUrl.String(), courierRole) {
			role = courierRole
		}
		tokenString, err := ctx.Cookie("jwt")
		if err != nil || tokenString == "" {
			l.Error("Unauthorized: Missing JWT token")
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized: Missing JWT token"})
			ctx.Abort()
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &auth.Claims{}, func(token *jwt.Token) (interface{}, error) {
			_, ok := token.Claims.(*auth.Claims)
			if !ok {
				return nil, fmt.Errorf("invalid token claims")
			}
			return []byte(os.Getenv("SECRET_KEY")), nil
		})
		if err != nil {
			l.Error(err)
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			ctx.Abort()
			return
		}
		claims, ok := token.Claims.(*auth.Claims)
		if !ok || !token.Valid {
			l.Error("token invalid")
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
			ctx.Abort()
			return
		}
		if claims.Role != role {
			l.Error("invalid role")
			ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized: Invalid role"})
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}
