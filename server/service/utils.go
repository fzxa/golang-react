package service

import (
	"log"
	"fmt"
	"net/http"
	"strings"
	"database/sql"
	"github.com/gin-gonic/gin"
    _ "github.com/go-sql-driver/mysql"
    "github.com/gin-contrib/sessions"
)

var SqlDB *sql.DB

func init() {

	var err error

	
	if err != nil{
		log.Fatalln(err)
	}
	//defer SqlDB.Close()
	
	SqlDB.SetMaxIdleConns(20)
	SqlDB.SetMaxOpenConns(20)
	
	if err := SqlDB.Ping(); err != nil{
		log.Fatalln(err)
	}
}

//Cors Middleware
func Cors() gin.HandlerFunc {
    return func(c *gin.Context) {
        method := c.Request.Method

        origin := c.Request.Header.Get("Origin")
        var headerKeys []string
        for k, _ := range c.Request.Header {
            headerKeys = append(headerKeys, k)
        }
        headerStr := strings.Join(headerKeys, ", ")
        if headerStr != "" {
            headerStr = fmt.Sprintf("access-control-allow-origin, access-control-allow-headers, %s", headerStr)
        } else {
            headerStr = "access-control-allow-origin, access-control-allow-headers"
        }
        if origin != "" {
            // c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
            c.Header("Access-Control-Allow-Origin", "*")
            c.Header("Access-Control-Allow-Headers", headerStr)
            c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
            // c.Header("Access-Control-Allow-Headers", "Authorization, Content-Length, X-CSRF-Token, Accept, Origin, Host, Connection, Accept-Encoding, Accept-Language,DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Pragma")
            c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
            // c.Header("Access-Control-Max-Age", "172800")
            c.Header("Access-Control-Allow-Credentials", "true")
            c.Set("content-type", "application/json")
        }

        //放行所有OPTIONS方法
        if method == "OPTIONS" {
            //c.JSON(http.StatusOK, "Options Request!")
        }

        c.Next()
    }
}

//AuthMiddleware session
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
       
        if strings.HasPrefix(c.Request.URL.Path, "/api/docs") && c.Request.Method == "GET" {
            // fmt.Printf("is pass %s ", c.Request.URL.Path);
			return
        }
        
        if strings.HasPrefix(c.Request.URL.Path,"/api/login") || strings.HasPrefix(c.Request.URL.Path,"/api/logout") || strings.HasPrefix(c.Request.URL.Path,"/api/checklogin") {
            return
        }
        
        session := sessions.Default(c)
        fmt.Printf("sessoin is %v ", session)
        user := session.Get("user")
        fmt.Printf("user is %v",user)
        if( user == nil ){
            c.JSON(http.StatusOK, gin.H{
                "code" 	: 10001,
                "msg"	: "Permission denied",
                "data" 	: "",
            })
            c.Abort()
            return
        }
        c.Next()
    }
}
