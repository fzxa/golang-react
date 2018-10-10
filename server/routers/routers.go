package routers

import (
	"net"
	"fmt"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	"develops.nebulas.io/server/handlers"
	. "develops.nebulas.io/server/service"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	store := memstore.NewStore([]byte("secret"))
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("addrs is %v ............", addrs)

	store.Options(sessions.Options{
		Domain: "/",
		Path: "/",
		MaxAge: 86400 * 30,
	})
	r.Use(sessions.Sessions("nebulas", store))
	r.Use(Cors())
	r.Use(AuthMiddleware())
	r.Static("/static", "./static")
	
	// r.Use(Session())
	
	RouterAPI := r.Group("/api")
	{
		//docs
		RouterAPI.GET("/docs/:title_url",handlers.Docs)
		RouterAPI.PUT("/docs/:docs_id", handlers.UpdateDocs)
		RouterAPI.POST("/docs", handlers.CreateDocs)
		
		//user auth
		RouterAPI.GET("/login", handlers.Login)
		RouterAPI.GET("/logout", handlers.Logout)
		RouterAPI.GET("/checklogin", handlers.CheckLogin)
	}
	return r
}
